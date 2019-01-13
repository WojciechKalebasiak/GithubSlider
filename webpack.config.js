var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var OptimizeJSPlugin = require("optimize-js-plugin");
var Mini
var env = process.env.NODE_ENV || "development";
console.log("NODE_ENV:", env);
var plugins = [
  new HtmlWebpackPlugin({
    template: "src/index.html",
    filename: "index.html",
    inject: "body"
  })
];
if (env === "production") {
  plugins.push(new OptimizeJSPlugin({ sourceMap: false }));
}
module.exports = {
  entry: ['react-hot-loader/patch',"./src/index.js"],
  mode: env,
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "app.bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader"
      },
      {
        test: /\.scss$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }, {loader:"sass-loader"}]
      }
    ]
  },
  plugins: plugins
};