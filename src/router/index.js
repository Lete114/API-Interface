const QQ = require('./QQ')
const User = require('./User')
const Video = require('./Video')
const Site = require('./Site')
const Bing = require('./Bing')
const { format } = require('../utils')
const { resolve } = require('path')
module.exports = (app) => {
  
  app.get('/', (req, res) => {
    const index = resolve(__dirname, '../../public/index.html')
    res.sendFile(index)
  })

  //拦截所有请求
  app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*') // 允许所有网址跨域请求
    res.header('Access-Control-Allow-Methods', 'GET, POST') // 只允许通过GET|POST来请求
    res.header(
      'Access-Control-Allow-Headers',
      'Origin,X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    res.header('Content-Type', 'application/json')
    if (req.method == 'GET' || req.method == 'POST') next()
    else res.status(400).send(format({ code: 400, msg: '请求方法不正确' }))
  })

  app.use('/qq', QQ)
  app.use('/user', User)
  app.use('/video', Video)
  app.use('/site', Site)
  app.use('/bing', Bing)
}
