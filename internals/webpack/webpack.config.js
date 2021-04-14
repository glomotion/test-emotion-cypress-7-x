const path = require("path");

module.exports = {
  entry: "./src/index.ts",
  output: {
    filename: "[name].[contenthash].js",
    path: path.join(__dirname, "../../dist"),
    publicPath: "/",
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx", ".jsx", ".css", ".d.ts"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /.global.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.module.css$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: {
                compileType: "module",
                mode: "local",
                auto: true,
                exportGlobals: true,
                localIdentName: "[name]__[local]--[hash:base64:5]",
              },
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                config: path.join(__dirname, "../../postcss.config.js"),
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2|webp)$/i,
        type: "asset",
      },
      {
        type: "javascript/auto",
        test: /(config)\.json$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
            },
          },
        ],
      },
    ],
  },
  plugins: [],
};
