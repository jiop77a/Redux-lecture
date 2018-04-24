const path = require("path");

module.exports = {
  entry: ["./todos_es6.js"],
  output: {
    path: __dirname,
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  devServer: {
    contentBase: __dirname
  },
  mode: 'none'
};
