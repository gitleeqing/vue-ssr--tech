const path = require("path");
const isDev = process.env.NODE_ENV === 'development'

const config = {
  target: 'web',
  entry: path.join(__dirname, "../client/index.js"),
  output: {
    filename: "bundle.[hash:8].js",
    path: path.join(__dirname, "../dist"),
    publicPath: isDev ? '/public/' : ''
    // 与webpack.config.client的index:'/public/index.html'有关
  },
  module: {
    rules: [
      {
        test: /\.(vue|js|jsx)$/,
        loader: "eslint-loader",
        exclude: /node_modules/,
        enforce: "pre"
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.jsx$/,
        loader: "babel-loader",
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      //将小于1024d的图片转为base64，减少http请求
      {
        test: /\.(gif|jpg|png|svg|jpeg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 1024,
              name: "[name].[hash:8].[ext]",
              outputPath: "assets/img/",
            },
          },
        ],
      },
    ],
  },
};

module.exports = config;
