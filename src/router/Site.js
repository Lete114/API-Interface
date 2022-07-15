const express = require('express')
const router = express.Router()
const { JSDOM } = require('jsdom')
const utils = require('../utils')

const SUCCESS = utils.SUCCESS()

// 全部
router.all('/', async (req, res) => {
  let url = req.query.url || req.body.url

  let SiteInfo = null // 信息
  let result = {} // 结果

  const isDomain = utils.rules.site.url_head.test(url)
  if (!isDomain) url = 'http://' + url

  let err = null
  await utils
    .request(url)
    .then((res) => {
      let data = res.data

      // 实例dom
      let dom = new JSDOM(data)

      // 标题
      let title = dom.window.document.querySelector('head title').textContent
      result.title = title

      // 描述
      let description = dom.window.document.querySelector('head meta[name=description]').getAttribute('content')
      result.description = description

      // 关键字
      let keywords = dom.window.document.querySelector('head meta[name=keywords]').getAttribute('content')
      result.keywords = keywords
    })
    .catch(() => (err = true))
  if (err) {
    res.status(400).send(utils.format({ code: 400, msg: '请输入正确的url地址' }))
    return
  }
  SiteInfo = Object.assign(SUCCESS, result)

  res.status(200).send(utils.format(SiteInfo))
})

// 图标
router.all('/favicon', async (req, res) => {
  let { url, type } = req.query || req.body

  let SiteInfo = '' // 信息
  let result = {} // 结果

  const isDomain = utils.rules.site.url_head.test(url)
  if (!isDomain) url = 'http://' + url

  let err = null
  await utils
    .request(url)
    .then((res) => {
      let data = res.data

      // 获取图标href地址
      let result_favicon = []
      let url_head = utils.rules.site.url_head // 是否是url请求地址正则表达式

      // 实例dom   并获取head下的所有 link[rel]
      let dom = new JSDOM(data)
      let link_list = dom.window.document.querySelectorAll('head link[rel]')

      link_list.forEach((element) => {
        let rel = element.getAttribute('rel') || ''
        if (rel.includes('icon')) {
          // 获取favicon地址
          let href = element.getAttribute('href')
          href = href.replace('../', '/').replace('./', '/') // 防止相对路径
          // 是否是url头像地址？(不是则拼接)
          let is_favicon = url_head.test(href)
          if (!is_favicon) {
            let origin = new URL(url).origin
            href = origin + href
          }
          result_favicon.push(href)
        }
      })
      result.favicon = result_favicon
    })
    .catch(() => (err = true))
  if (err) {
    res.status(400).send(utils.format({ code: 400, msg: '请输入正确的url地址' }))
    return
  }

  if (type === 'image') return res.redirect(result.favicon[0])
  SiteInfo = Object.assign(SUCCESS, result)

  res.status(200).send(utils.format(SiteInfo))
})

module.exports = router
