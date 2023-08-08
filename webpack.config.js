const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const path = require("path");

module.exports = {
  entry: {
    main: path.resolve(__dirname, "assets", "js", "main.js"),
    edit: path.resolve(__dirname, "assets", "js", "edit.js"),
    create: path.resolve(__dirname, "assets", "js", "create.js"),
    feedback: path.resolve(__dirname, "assets", "js", "feedback-detial.js"),
  },
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "build", "assets", "js"),
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
      {
        test: /Json\/.*\.json$/, // JSON dosyalarını işlemek için eklenen kural
        type: "asset/resource",
        generator: {
          filename: "../json/[name][ext]",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
    }),
    // Birden fazla HTML dosyasını bu dizi içinde belirtebilirsiniz
    ...["feedback-detial", "create-feedback", "edit", "roadmap"].map((page) => {
      return new HtmlWebpackPlugin({
        filename: `${page}.html`,
        template: path.resolve(__dirname, "assets", "page", `${page}.html`),
        chunks: [page],
      });
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
