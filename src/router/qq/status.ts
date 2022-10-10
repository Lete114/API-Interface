import { KV } from '../../types'
import { getRequest } from '../../utils'

export = async (param: KV) => {
  const { qq } = param
  // 返回格式: Online[0]=0 OR Online[0]=1
  // 只能判断电脑端状态，无法判断手机端
  const url = `https://webpresence.qq.com/getonline?Type=1&${qq}:`
  const result = await getRequest(url)

  const start = result.raw.indexOf('=') + 1
  const end = result.raw.indexOf(';', start)
  if (start === -1 || end === -1) throw new Error('"qq" parameter is not legal')
  const data = (result.raw as string).substring(start, end)

  const res: { state: string } = { state: data === '1' ? '电脑在线' : '电脑离线' }
  return res
}
