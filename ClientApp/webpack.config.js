// webpack v4
const path = require("path");

// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: { main: "./src/index.js" },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js"
  },
  target: "node", // update from 23.12.2018
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ["style-loader", MiniCssExtractPlugin.loader, "css-loader"]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "style.css"
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    })
  ]
};
