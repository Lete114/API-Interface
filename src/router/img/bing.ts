import { getRequest } from '../../utils'
import { KV } from '../../types'

const dpis = [
  'UHD',
  '1920x1200',
  '1920x1080',
  '1366x768',
  '1280x768',
  '1024x768',
  '800x600',
  '800x480',
  '768x1280',
  '720x1280',
  '640x480',
  '480x800',
  '400x240',
  '320x240',
  '240x320'
]

function dateFormat(date: string) {
  date = date.slice(0, 4) + '-' + date.slice(4)
  date = date.slice(0, 7) + '-' + date.slice(7)
  return date
}

const BING = 'https://www.bing.com'
const { abs, floor } = Math
const regions = ['zh-CN', 'en-US', 'ja-JP', 'en-AU', 'en-UK', 'de-DE', 'en-NZ', 'en-CA']

// eslint-disable-next-line max-statements
export = async (params: KV) => {
  const { region, date, dpi, type } = params
  const day = date ? floor(abs((new Date().getTime() - new Date(date as string).getTime()) / (1000 * 3600 * 24))) : 0

  const info: {
    startdate: string
    enddate: string
    title: string
    copyright: string
    cover: string[]
    redirect?: string
  } = {
    startdate: '',
    enddate: '',
    title: '',
    copyright: '',
    cover: []
  }
  const mkt = regions.includes((region as string) || 'en-US') && region
  const url = `${BING}/HPImageArchive.aspx?idx=${day}&n=1&mkt=${mkt}&format=js`
  const { startdate, enddate, urlbase, copyright, title } = (await getRequest(url)).images[0]

  info.startdate = dateFormat(startdate)
  info.enddate = dateFormat(enddate)
  info.title = title
  info.copyright = copyright
  info.redirect = `${BING}${urlbase}_1920x1080.jpg`
  info.cover = []

  for (const d of dpis) {
    const cover = `${BING}${urlbase}_${d}.jpg`
    if (dpis.includes(dpi as string)) info.redirect = cover
    info.cover.push(cover)
  }

  if (!type) delete info.redirect
  return info
}
