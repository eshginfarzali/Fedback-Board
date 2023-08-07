/* eslint-disable */
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const path = require("path");
module.exports = {
  entry: {
    main: path.resolve(__dirname, "assets","js", "main.js"),
  },
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "build"),
    clean: true,
  },
  devServer: {
    port: 3000,
    hot: true, // Hot module replacement js bir başa deyişikleri run edir
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
    }),
    new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, 'assets', 'img'), 
            to: 'assets/img',
          },
          {
            from: path.resolve(__dirname, 'assets', 'icons'),
            to: 'assets/icons',
          },
        ],
      }),
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
};