const QQUtils = require('./QQUtils')
const { request } = require('./Request')
const rules = require('./Rules')

module.exports = {
  format(data) {
    return JSON.stringify(data, null, 2)
  },
  SUCCESS() {
    return { code: 200, msg: '请求成功' }
  },
  ERROR() {
    return { code: 204, msg: '请求无数据' }
  },
  request,
  QQUtils,
  rules
}
