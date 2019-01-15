const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const OptimizeJSPlugin = require("optimize-js-plugin");
const env = process.env.NODE_ENV || "development";
console.log("NODE_ENV:", env);
const plugins = [
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
  entry: ["react-hot-loader/patch", "./src/index.js"],
  mode: env,
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "app.bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        resolve: {
          extensions: [".js", ".jsx"]
        }
      },
      {
        test: /\.scss$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "sass-loader" }
        ]
      }
    ]
  },
  plugins: plugins
};
