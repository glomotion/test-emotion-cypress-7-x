// Important modules this config uses
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const readPkgUp = require('read-pkg-up');
const logging = require('webpack/lib/logging/runtime');

module.exports = require('./webpack.base.config')({
  mode: 'production',

  // In production, we skip all hot-reloading stuff
  entry: path.join(process.cwd(), 'app/index.tsx'),

  // Utilize long-term caching by adding content hashes (not compilation hashes) to compiled assets
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].chunk.js',
  },

  tsLoaders: [
    { loader: 'babel-loader' }, // using babel after typescript transpiles to target es6
    {
      loader: 'ts-loader',
      options: {
        transpileOnly: true, // fork-ts-checker-webpack-plugin is used for type checking
        logLevel: 'info',
      },
    },
  ],

  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          warnings: false,
          compress: {
            comparisons: false,
          },
          parse: {},
          mangle: true,
          output: {
            comments: false,
            ascii_only: true,
          },
        },
        sourceMap: true,
      }),
    ],
    nodeEnv: 'production',
    sideEffects: true,
    concatenateModules: true,
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: 10,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/,
            )[1];
            return `npm.${packageName.replace('@', '')}`;
          },
        },
      },
    },
  },

  plugins: [
    // Rewrite bn.js imports. See https://immutable.atlassian.net/browse/IMX-1530.
    //
    // `bn.js` is directly or indirectly imported by many marketplace
    // dependencies, including `@ethersproject/units`, `@imtbl/imx-link-{lib,
    // types, crypto}`, `crypto-browserify` and others. Two major versions of
    // the library are used - 4.x and 5.x - and because of the way the
    // node module resolution works, `bn.js` ends up getting installed in
    // `node_modules/**` a number of times (currently 16, and 11 after npm
    // dedup, see `npm list -a bn.js`).
    //
    // We do the following to avoid having 11 copies of bn.js emitted in the prod bundle:
    //
    // 1) In our package.json, we explicitly depend on bn.js 4.x and bn.js 5.x and
    //    install them under `node_modules/bn.js-4` and `node_modules/bn.js-5`
    //    respectively.
    //
    // 2) Whenever a module imports `bn.js`, we load the module's `package.json`
    //    and see what version of `bn.js` it depends on.
    //
    // 3) Depending on the `bn.js` version detected at step 2), we instruct webpack
    //    to alias the import to `node_modules/bn.js-4` or `node_modules/bn.js-5`.
    new webpack.NormalModuleReplacementPlugin(/^bn.js$/, resource => {
      // load the package.json of this bn.js caller
      const caller = resource.context;
      const {packageJson} = readPkgUp.sync({cwd: caller});
      // find what bn.js version they depend on
      const version = packageJson.dependencies['bn.js'];

      const logger = logging.getLogger("imx-dedup");

      if (!version) {
        // This is a bug in the caller. It's currently triggered by @ethersproject/signing-key.
        logger.warn(`${packageJson.name} uses bn.js but doesn't list the dependency in package.json`)
        return;
      }

      const redirect = (resource, target) => {
        logger.log(`redirecting ${caller} to node_modules/${target} (required version: ${version})`);
        resource.request = target;
      }

      if (version.match(/\^?4\./)) {
        redirect(resource, 'bn.js-4');
      } else if (version.match(/\^?5\./)) {
        redirect(resource, 'bn.js-5');
      } else {
        logger.warn(`${packageJson.name} uses bn.js version ${version}, NOT deduplicating`)
      }
    }),

    // Minify and optimize the index.html
    new HtmlWebpackPlugin({
      template: 'app/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      inject: true,
    }),

    // Add favicon assets, generated from a single SVG:
    new FaviconsWebpackPlugin({
      // Your source logo (required)
      logo: './app/images/logo--imx-x-blue.svg',
    }),

    // Put it in the end to capture all the HtmlWebpackPlugin's
    // assets manipulations and do leak its manipulations to HtmlWebpackPlugin
    // new OfflinePlugin({
    //   // replace with 'cache-first' for faster performance. See https://github.com/NekR/offline-plugin/blob/master/docs/options.md#responsestrategy-cache-first--network-first
    //   responseStrategy: 'network-first',

    //   relativePaths: false,
    //   publicPath: '/',
    //   appShell: '/',

    //   // No need to cache .htaccess. See http://mxs.is/googmp,
    //   // this is applied before any match in `caches` section
    //   excludes: ['.htaccess'],

    //   caches: {
    //     main: [':rest:'],

    //     // All chunks marked as `additional`, loaded after main section
    //     // and do not prevent SW to install. Change to `optional` if
    //     // do not want them to be preloaded at all (cached only when first loaded)
    //     additional: ['*.chunk.js'],
    //   },

    //   // Removes warning for about `additional` section usage
    //   safeToUseOptionalCaches: true,
    // }),

    new WebpackPwaManifest({
      name: 'Immutable X Marketplace',
      short_name: 'Imx Marketplace',
      description: 'Immutable X marketplace project!',
      background_color: '#fafafa',
      theme_color: '#b1624d',
      inject: true,
      ios: true,
    }),

    new webpack.ids.HashedModuleIdsPlugin({
      hashFunction: 'sha256',
      hashDigest: 'hex',
      hashDigestLength: 20,
    }),

    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
    }),
  ],

  resolveAlias: {
    // fp-ts is distributed as both cjs and esm, and we want to import the esm
    // version to enable tree shaking. io-ts-reporter (used by link)
    // accidentally hardcodes importing the cjs version of fp-ts, see:
    // https://github.com/gillchristian/io-ts-reporters/blob/d1dd1e132cbebc550618ea14b715fd743d05954a/src/index.ts#L19
    //
    // with this alias, we force webpack to always resolve to the esm version
    'fp-ts/lib': 'fp-ts/es6'
  },

  performance: {
    assetFilter: assetFilename =>
      !/(\.map$)|(^(main\.|favicon\.))/.test(assetFilename),
  },
});
