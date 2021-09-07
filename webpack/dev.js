const {merge} = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {join} = require('path')
const base = require('./base')

const webpack = {
  mode: 'development', // 环境模式
  plugins: [
    new HtmlWebpackPlugin({
      template: join(__dirname, '../views/index.html'),
      filename: 'index.html', // 打包后输出的文件名
      inject: false,
      data:{lang:'zh-CN',title:'API-Interface'}
    })
  ],
  devServer: {
    // contentBase: join(__dirname, '../public/vue/index.html'),
    port: 1104,
    // publicPath: '/',
    hot: true, // 启用热重载
    compress: true // 压缩
  }
}

module.exports = merge(base, webpack)
