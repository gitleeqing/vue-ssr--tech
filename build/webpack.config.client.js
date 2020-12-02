const path = require("path");
const webpack = require('webpack')
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HTMLPlugin = require("html-webpack-plugin");
const isDev = process.env.NODE_ENV === "development";
const baseConfig = require("./webpack.config.base");
const { merge } = require("webpack-merge");

let config;

if (isDev) {
  config = merge(baseConfig, {
    mode: 'development',
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
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: isDev ? '"development"' : '"production"'
        }
      }),
      new VueLoaderPlugin(),
      //vue-loader会解析.vue文件，提取出每个语言块，如果有必要会通过其他loader处理，最后将他们组装成一个commonjs模块；module.exports出一个vue.js组件对象
      new HTMLPlugin({
        template: path.join(__dirname,"template.html")
      }),
     //为html文件中引入的外部资源如script、link动态添加每次compile后的hash，防止引用缓存的外部文件问题
     //可以生成创建html入口文件，比如单页面可以生成一个html文件入口，配置N个html-webpack-plugin可以生成N个页面入口
    ]
  });
  config.devServer = {
    port: 8000,
    host: "localhost",
    overlay: {
      errors: true,
    },
    hot: true,
    historyApiFallback: {
      index:'/public/index.html'
    }
  }
} else {
  config = merge(baseConfig, {
    mode: 'production',
    entry: {
      //分离JS文件
      app: path.join(__dirname, "../client/index.js"),
      //vendor: ["vue"],
    },
    output: {
      filename: "[name].[chunkhash:8].js",
    },
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
        'process.env': {
          NODE_ENV: isDev ? '"development"' : '"production"'
        }
      }),
      new VueLoaderPlugin(),
      new HTMLPlugin({
        template: path.join(__dirname,"template.html")
      }),
      new MiniCssExtractPlugin({
        // 将css单独打包成一个文件的插件，它为每个包含css的js文件都创建一个css文件。它支持css和sourceMaps的按需加载
        // 目前只有在webpack V4版本才支持使用该插件(注意分离出来的只是独立的.css/.styl文件，并不包括.vue文件里的css代码)
        filename: '[name].[contenthash].css',
        chunkFilename: '[id].[contenthash].css',
        ignoreOrder: false, // css文件顺序冲突警告是否开启
      }),
    ],
    optimization: {
      splitChunks: {
        cacheGroups: {
          // 这里开始设置缓存的 chunks
          commons: {
            chunks: "initial", // 必须三选一： "initial" | "all" | "async"(默认就是异步)
            minSize: 0, // 最小尺寸，默认0,
            minChunks: 2, // 最小 chunk ，默认1
            maxInitialRequests: 5, // 最大初始化请求书，默认1
          },
          vendor: {
            test: /node_modules/, // 正则规则验证，如果符合就提取 chunk
            chunks: "initial", // 必须三选一： "initial" | "all" | "async"(默认就是异步)
            name: "vendor", // 要缓存的 分隔出来的 chunk 名称
            priority: 10, // 缓存组优先级
            enforce: true,
          },
        },
      },
      runtimeChunk: true,
    },
  });
}
module.exports = config;
