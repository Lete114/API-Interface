import { KV } from '../../types'
import { getRequest } from '../../utils'

export = async (param: KV) => {
  const { qq, type } = param
  const url = `https://ptlogin2.qq.com/getface?appid=1006102&uin=${qq}&imgtype=3`
  // pt.setHeader({"QQ":"QQ avatar url"})
  const { raw } = await getRequest(url)

  const start = raw.indexOf('http')
  const end = raw.indexOf('"', start)
  if (start === -1 || end === -1) throw new Error('"qq" parameter is not legal')
  const avarat = raw.substring(start, end)

  const data: {
    redirect?: string
    avarat: string[]
  } = {
    redirect: avarat,
    avarat: [avarat, `https://q1.qlogo.cn/g?b=qq&nk=${qq}&s=100`, `http://qlogo1.store.qq.com/qzone/${qq}/${qq}/100`]
  }
  if (!type) delete data.redirect
  return data
}
