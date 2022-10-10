import { JSDOM } from 'jsdom'

import { KV } from '../types'
import { getRequest, isHttp, isUrl } from '../utils'

export = async (params: KV) => {
  const { url, type } = params

  if (!isUrl(url)) throw new Error('"url" parameter is not legal')

  const { raw } = await getRequest(url)
  const dom = new JSDOM(raw)

  const titleDom = dom.window.document.querySelector('title')
  const title = (titleDom && titleDom.textContent) || null

  const links = [].slice.call(dom.window.document.querySelectorAll('link[rel][href]')) as Array<HTMLLinkElement>
  const iconDom = links.find((_el) => _el.rel.includes('icon'))
  let favicon = (iconDom && iconDom.getAttribute('href')) || null
  // If `icon` is not the ['https://', 'http://', '//'] protocol, splice on the `origin` of the a tag
  if (favicon && !isHttp(favicon)) favicon = new URL(url).origin + favicon

  const descriptionDom = dom.window.document.querySelector('head meta[name=description]')
  const description = (descriptionDom && descriptionDom.getAttribute('content')) || null

  const keywordsDom = dom.window.document.querySelector('head meta[name=keywords]')
  const keywords = (keywordsDom && keywordsDom.getAttribute('content')) || null

  const data: {
    title: string | null
    favicon: string | null
    description: string | null
    keywords: string | null
    redirect?: string
  } = {
    title,
    favicon,
    description,
    keywords
  }

  if (type && favicon) data.redirect = favicon

  return data
}
