module.exports = {
  plugins: [
    // @TODO: storybook bundles an older version of postcss-loader,
    // which doesnt support this plugin. :(
    // Have logged this an issue. https://github.com/storybookjs/storybook/issues/13091
    // require('postcss-mixins'),
    require('autoprefixer'),
  ],
};
