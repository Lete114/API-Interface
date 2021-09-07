const express = require('express')
const router = express.Router()
const utils = require('../utils')

const SUCCESS = utils.SUCCESS(),
  ERROR = utils.ERROR()

router.all('/', async (req, res) => {
  const isDomestic = req.query.cn || req.body.cn
  let bing_info = {}
  bing_info.cover = []

  // 国内：http://cn.bing.com/HPImageArchive.aspx?idx=0&n=1
  // 国外: http://www.bing.com/HPImageArchive.aspx?idx=0&n=1
  const url_cn = 'http://cn.bing.com/HPImageArchive.aspx?idx=0&n=1'
  const url = 'http://www.bing.com/HPImageArchive.aspx?idx=0&n=1'

  const bing_HP_Image_Archive = isDomestic == 'true' ? url_cn : url
  await utils.request(bing_HP_Image_Archive).then((res) => {
    res.data.replace(utils.rules.bing_cover)
    const Domestic = 'https://cn.bing.com' + RegExp.$1
    const Foreign = 'https://www.bing.com' + RegExp.$1
    bing_info.cover.push(Domestic, Foreign)
  })

  bing_info = Object.assign(SUCCESS, bing_info)

  res.status(200).send(utils.format(bing_info))
})

module.exports = router
