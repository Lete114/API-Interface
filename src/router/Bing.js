const express = require('express')
const router = express.Router()
const utils = require('../utils')

const SUCCESS = utils.SUCCESS(),
  ERROR = utils.ERROR()

router.all('/', async (req, res) => {
  const { cn, type } = req.query || req.body
  let bing_info = { cover: [] }

  // 国内：http://cn.bing.com/HPImageArchive.aspx?idx=0&n=1
  // 国外: http://www.bing.com/HPImageArchive.aspx?idx=0&n=1
  const url_cn = 'http://cn.bing.com/HPImageArchive.aspx?idx=0&n=1'
  const url = 'http://www.bing.com/HPImageArchive.aspx?idx=0&n=1'

  const bing_HP_Image_Archive = cn ? url_cn : url
  const result = await utils.request(bing_HP_Image_Archive)
  result.data.replace(utils.rules.bing_cover, ($0, $1) => {
    const Domestic = 'https://cn.bing.com' + $1
    const Foreign = 'https://www.bing.com' + $1
    bing_info.cover.push(Domestic, Foreign)
  })
  if (type === 'image') return res.redirect(bing_info.cover[cn ? 0 : 1])
  bing_info = Object.assign(SUCCESS, bing_info)

  res.status(200).send(utils.format(bing_info))
})

module.exports = router
