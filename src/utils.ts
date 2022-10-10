import https from 'https'
import { KV } from './types'

export function stringify(data: KV, format?: boolean) {
  return format ? JSON.stringify(data, null, 2) : JSON.stringify(data)
}

export function getRedirectUrl(url: string) {
  // eslint-disable-next-line no-unused-vars
  return new Promise((resolve: (v: string) => void, reject) => {
    https
      .get(url, async (res) => {
        // 处理重定向
        if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400) {
          resolve(res.headers.location as string)
        }
      })
      .on('error', (e) => {
        reject(e)
      })
  })
}

export function getRequest(url: string, responseType?: string) {
  // eslint-disable-next-line no-unused-vars
  return new Promise((resolve: (v: KV) => void, reject) => {
    https
      .get(url, async (res) => {
        // 处理重定向
        if (res.statusCode && res.statusCode >= 300) {
          const result = await getRequest(res.headers.location as string)
          resolve(result)
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data: any[] = []
        res.on('data', (chunk) => {
          data.push(chunk)
        })
        res.on('end', () => {
          if (responseType === 'arraybuffer') return resolve({ buffer: data[0] })
          const raw = Buffer.concat(data).toString()
          try {
            resolve(JSON.parse(raw))
          } catch (error) {
            resolve({ raw })
          }
        })
      })
      .on('error', (e) => {
        reject(e)
      })
  })
}

export function isQQ(qq: string) {
  return qq.length >= 5 && qq.length <= 10
}

export function isHttp(url: string) {
  return /^(https?:)?\/\//g.test(url)
}

export function isUrl(str: string) {
  try {
    const url = new URL(str)
    if (/^https?:\/\//.test(str) && /([A-Za-z\d]{1,30}\.)+[A-Za-z\d]{2,5}$/.test(url.hostname)) {
      return true
    }
    // eslint-disable-next-line no-empty
  } catch (error) {}
  return false
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isNumber(value: any) {
  return !isNaN(parseFloat(value)) && isFinite(value)
}

export function throwUrlError() {
  throw new Error('"url" parameter is not legal')
}
