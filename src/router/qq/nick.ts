import { KV } from '../../types'
import { getRequest } from '../../utils'

export = async (param: KV) => {
  const { qq } = param

  // qq 昵称仅支持 GBK 编码，若使用 utf8 会产生乱码
  const url = 'https://r.qzone.qq.com/fcg-bin/cgi_get_portrait.fcg?g_tk=&uins=' + qq
  const result = await getRequest(url, 'arraybuffer')

  // 在 node 13 之前使用原生 TextEncoder 需要完整的 ICU Data，所以如果是 node 13 之前的版本需要使用 iconv || iconv-lite 转换
  // TextDecoder node 12: https://nodejs.org/docs/latest-v12.x/api/util.html#util_class_util_textdecoder
  // TextDecoder node 13: https://nodejs.org/docs/latest-v13.x/api/util.html#util_class_util_textdecoder
  let data = new TextDecoder('gbk').decode(result.buffer)
  const start = data.indexOf('[')
  const end = data.indexOf(']', start) + 1
  if (start === -1 || end === -1) throw new Error('"qq" parameter is not legal')
  data = data.substring(start, end)

  const res: { nick: string } = {
    nick: JSON.parse(data)[6]
  }

  return res
}
