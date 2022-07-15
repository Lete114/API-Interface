const express = require('express')
const router = express.Router()
const utils = require('../utils')
const QQUtils = require('../utils/QQUtils')

// 常量
const NOT_QQ = { code: 204, msg: 'QQ号不合法' }
const SUCCESS = utils.SUCCESS()

router.all('/:qq', async (req, res) => {
  // 获取请求参数
  let QQ = req.params.qq || req.query.qq || req.body.qq

  if (!QQUtils.isQQ(QQ)) {
    res.status(400).send(utils.format({ code: 400, msg: '请输入正确的QQ号' }))
    return
  }

  let QQInfo = null
  let Avatar = null
  let Nick = null
  let Online = null

  // 获取qq昵称
  Nick = await QQUtils.nick(QQ).catch((err) => {
    console.error('请求出错', err)
    res.status(400).send(utils.format({ code: 400, msg: '输入的QQ号不合法' }))
    return
  })

  // 获取qq头像信息
  Avatar = await QQUtils.avatar(QQ)

  // 获取qq电脑在线状态
  Online = await QQUtils.status(QQ)

  // 处理数据
  Avatar.push(Nick.QzoneAvatar)
  QQInfo = {
    nick: Nick.Nick,
    status: Online,
    avatar: Avatar
  }

  QQInfo = Object.assign(SUCCESS, QQInfo)
  res.status(200).send(utils.format(QQInfo))
})

// 获取qq头像
router.all('/avatar/:qq', async (req, res) => {
  // 获取请求参数
  let { qq: QQ, type } = { ...(req.params || {}), ...(req.query || {}), ...(req.body || {}) }

  if (!QQUtils.isQQ(QQ)) {
    res.status(400).send(utils.format({ code: 400, msg: '请输入正确的QQ号' }))
    return
  }

  let Avatar = {}
  Avatar.avatar = await QQUtils.avatar(QQ)
  Avatar = Object.assign(SUCCESS, Avatar)

  if (type === 'image') return res.redirect(Avatar.avatar[0])
  res.status(200).send(utils.format(Avatar))
})

// 获取所有qq头像
router.all('/avatar/all/:qq', async (req, res) => {
  // 获取请求参数
  let QQ = req.params.qq || req.body.qq

  if (!QQUtils.isQQ(QQ)) {
    res.status(400).send(utils.format({ code: 400, msg: '请输入正确的QQ号' }))
    return
  }

  let Avatar = {}
  Avatar.avatar = await QQUtils.avatar(QQ)
  let QzoneAvatar = await QQUtils.nick(QQ)
  Avatar.avatar.push(QzoneAvatar.QzoneAvatar)
  Avatar = Object.assign(SUCCESS, Avatar)

  res.status(200).send(utils.format(Avatar))
})

// 获取qq昵称
router.all('/nick/:qq', async (req, res) => {
  // 获取请求参数
  let QQ = req.params.qq || req.body.qq

  if (!QQUtils.isQQ(QQ)) {
    res.status(400).send(utils.format({ code: 400, msg: '请输入正确的QQ号' }))
    return
  }

  let Nick = {}
  let result = await QQUtils.nick(QQ)
  Nick.nick = result.Nick
  Nick = Object.assign(SUCCESS, Nick)

  res.status(200).send(utils.format(Nick))
})

// 获取qq电脑在线状态
router.all('/status/:qq', async (req, res) => {
  // 获取请求参数
  let QQ = req.params.qq || req.body.qq

  if (!QQUtils.isQQ(QQ)) {
    res.status(400).send(utils.format({ code: 400, msg: '请输入正确的QQ号' }))
    return
  }

  let Status = {}

  let result = await QQUtils.status(QQ)
  Status.status = result.Online
  Status = Object.assign(SUCCESS, Status)

  res.status(200).send(utils.format(Status))
})

module.exports = router
