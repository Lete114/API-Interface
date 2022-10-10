import { IncomingMessage, ServerResponse } from 'http'
import bodyData from 'body-data'
import main from './main'
import { FN, KV } from './types'
import { stringify } from './utils'
import { homepage } from '../package.json'

const routers: FN = {
  '/site': main.site,
  '/img/bing': main.bing,
  '/qq/avatar': main.qqAvatar,
  '/qq/nick': main.qqNick,
  '/qq/status': main.qqStatus,
  '/video/douyin': main.videoDouyin,
  '/video/huoshan': main.videoHuoshan,
  '/video/weishi': main.videoPipixia,
  '/video/pipixia': main.videoWeishi,
  '/video/zuiyou': main.videoZuiyou
}

const types = ['image', 'mp4']

export = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const { pathname } = new URL(req.url || '/', 'http://127.0.0.1')
    if (pathname === '/favicon.ico') return res.end()

    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Cache-Control', 'no-store, max-age=0, must-revalidate')
    res.setHeader('Content-Type', 'application/json;charset=utf-8')

    const data = (await bodyData(req)) as KV
    const fun = routers[pathname]

    if (!fun) {
      res.statusCode = 404
      res.end(stringify({ code: res.statusCode, message: 'Not Found', source: homepage }))
      return
    }
    const result = await fun(data)
    if (types.includes(data.type)) {
      res.writeHead(302, { Location: result.redirect })
    }
    res.end(stringify(result, !!data.format))
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
    res.statusCode = 500
    res.end(stringify({ code: res.statusCode, message: '' }))
  }
}
