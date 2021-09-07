const { VueLoaderPlugin } = require('vue-loader')
const { join } = require('path')
const TerserPlugin = require("terser-webpack-plugin");


module.exports = {
  entry: join(__dirname, '../src/vue/main.js'), // 打包入口
  output: {
    path: join(__dirname, '../public/vue'), // 打包出口(输出目录)
    filename: '[name].js' // 打包完的静态资源文件名
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ['vue-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/, // 不编译node_modules下的文件
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin() // 添加 VueLoaderPlugin 插件
  ],optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,//不将注释提取到单独的文件中
      }),
    ],
  }

}
