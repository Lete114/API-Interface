const { request } = require('./Request')
const iconv = require('iconv-lite')

module.exports = {
  isQQ(QQ) {
    return QQ.length >= 5 && QQ.length <= 10
  },
  async avatar(QQ) {
    let ReturnResult
    // 获取qq头像信息
    await request('https://ptlogin2.qq.com/getface?appid=1006102&uin=' + QQ + '&imgtype=3').then((result) => {
      // 请求返回结果内容为：pt.setHeader({"QQ号":"QQ头像加密地址"})
      if (result.data == 'pt.setHeader({"":""})') ReturnResult = false
      else {
        // 替换提取法 replace()
        let data = result.data
        // 去除多余无用的字符，留下json数据
        data = data.replace('pt.setHeader(', '').replace(')', '')
        // 解析json
        data = JSON.parse(data)
        // 返回结果   data[QQ]：根据key获取value
        ReturnResult = [data[QQ], 'https://q1.qlogo.cn/g?b=qq&nk=' + QQ + '&s=100']
      }
    })
    return ReturnResult
  },

  async nick(QQ) {
    // 获取qq昵称(请求地址编码为GBK，NodeJS不支持GBK，即不认识GBK导致乱码)
    // responseType: "arraybuffer" 请求返回类型为buffer
    let ReturnResult
    await request({
      url: 'https://r.qzone.qq.com/fcg-bin/cgi_get_portrait.fcg?g_tk=&uins=' + QQ,
      responseType: 'arraybuffer'
    }).then((result) => {
      // 通过iconv解码(解buffer)为GBK
      let data = iconv.decode(result.data, 'gbk')
      // 去除多余字符
      data.replace(/portraitCallBack\((.*?)\)/, () => {
        let json = JSON.parse(RegExp.$1) // 获取正则表达式中‘()’的内容
        let final = json[QQ]
        ReturnResult = { QzoneAvatar: final[0], Nick: final[6] }
      })
    })
    return ReturnResult
  },
  async status(QQ) {
    // 获取qq在线状态 返回格式: Online[0]=0 OR Online[0]=1
    // 电脑离线：0 电脑在线：1 (接口只能判断电脑端状态，无法判断手机端)
    let ReturnResult
    await request('https://webpresence.qq.com/getonline?Type=1&' + QQ + ':').then((result) => {
      let data = result.data
      data.replace(/online\[0\]=(.*?);/, () => {
        if (RegExp.$1 == '1') ReturnResult = { cdoe: 1, Online: '电脑在线' }
        else ReturnResult = { code: 0, Online: '电脑离线' }
      })
    })
    return ReturnResult
  }
}
