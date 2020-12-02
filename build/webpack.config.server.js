const baseConfig = require("./webpack.config.base")
const path = require("path")
const webpack = require('webpack')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const VueServerPlugin = require('vue-server-renderer/server-plugin')
const { merge } = require("webpack-merge")

let config;

config = merge(baseConfig, {
  target: 'node',
  entry: path.join(__dirname, "../client/server-entry.js"),
  devtool: 'source-map',
  output:{
    libraryTarget: 'commonjs2',
    filename: 'server-entry.js',
    path: path.join(_dirname, '../server-build')
  },
  externals: Object.keys(require('../package.json').dependencies),
  module: {
    rules: [
      //css预处理器，使用模块化的方式写css代码
      //stylus-loader专门用来处理stylus文件，处理完成后变成css文件，交给css-loader.webpack的loader就是这样一级一级向上传递，每一层loader只处理自己关心的部分
      {
        test: /\.(styl(us)?|css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // 您可以在此处指定publicPath
              // 默认情况下，它使用webpackOptions.output
              publicPath: "./",
              // 开发环境开启hmr
              hmr: process.env.NODE_ENV === "development",
              esModule: false
            },
          },
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
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"server"'
    }),
    new VueServerPlugin(),
    new MiniCssExtractPlugin({
      // 将css单独打包成一个文件的插件，它为每个包含css的js文件都创建一个css文件。它支持css和sourceMaps的按需加载
      // 目前只有在webpack V4版本才支持使用该插件
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css',
      ignoreOrder: false, // css文件顺序冲突警告是否开启
    }),
  ]
});

module.exports = config;
