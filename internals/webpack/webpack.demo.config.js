const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

const config = require("./webpack.config");

module.exports = {
  ...config,
  mode: "development",
  entry: "./src/index.tsx",
  devServer: {
    contentBase: path.join(__dirname, "../../dist"),
    compress: true,
    port: 8081,
    open: true,
  },
  plugins: [
    ...config.plugins,
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "../../src/index.html"),
    }),
  ],
};
