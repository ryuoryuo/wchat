const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpack = require("webpack"); //to access built-in plugins

module.exports = {
  entry: ["./src/index"],
  mode: process.env.NODE_ENV || "development",
  devtool: process.env.NODE_ENV ? false : "eval-source-map",
  output: {
    pathinfo: process.env.NODE_ENV || true,
    filename: process.env.NODE_ENV
      ? "dist/[name].[chunkhash:8].js"
      : "dist/main.js",
    chunkFilename: process.env.NODE_ENV
      ? "dist/[name].[chunkhash:8].chunk.js"
      : "dist/[name].chunk.js"
  },
  resolve: {
    alias: {
      "#": path.resolve(__dirname, "src/")
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["react-hot-loader/webpack", "babel-loader"]
      }
    ]
  },
  devServer: {
    contentBase: "./src",
    hot: true,
    overlay: {
      warnings: true,
      errors: true
    }
  },
  optimization: {
    splitChunks: {
      chunks: "all"
    },
    runtimeChunk: true
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    })
  ]
};
