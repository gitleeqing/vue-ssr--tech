const path = require("path");
const webpack = require('webpack')
const baseConfig = require("./webpack.config.base");
const HTMLPlugin = require("html-webpack-plugin");
const { merge } = require("webpack-merge");

let config;

config = merge(baseConfig, {
  entry: path.join(__dirname, "../practice/index.js"),
  devtool: '#cheap-module-eval-source-map',
  module: {
    rules: [
      {
        test: /\.(styl(us)?|css)$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: { sourceMap: true },
          },
          "stylus-loader",
        ],
      },
    ],
  },
  resolve:{
    alias:{
      "vue": path.join(__dirname,"../node_modules/vue/dist/vue.esm.js")
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      }
    }),
    new HTMLPlugin({
      template: path.join(__dirname,"template.html")
    }),
  ],
});
config.devServer = {
  port: 8080,
  host: "localhost",
  overlay: {
    errors: true,
  },
  hot: true,
  historyApiFallback: {
    index:'/public/index.html'
  }
}

module.exports = config;
