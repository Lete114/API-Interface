const express = require("express")
const router = express.Router()
const utils = require("../utils")
const parser  = require('ua-parser-js')

const SUCCESS = utils.SUCCESS(), ERROR = utils.ERROR()

router.all("/", (req, res) => {

  let UserInfo = {}
  let ip = "127.0.0.1"

  ip = req.headers["x-real-ip"] == "::1" ? ip : req.headers["x-real-ip"]
  UserInfo.ip = ip

  let UA = parser(req.headers['user-agent']);

  // CPU
  UserInfo.cpu = UA.cpu.architecture
  // 操作系统
  UserInfo.os = {}
  UserInfo.os.name = UA.os.name
  UserInfo.os.version = UA.os.version
  // 浏览器
  UserInfo.browser = {}
  UserInfo.browser.name = UA.browser.name
  UserInfo.browser.version = UA.browser.version.split(".")[0]
  UserInfo.browser.fullVersion = UA.browser.version
  // 浏览器引擎
  UserInfo.engine = {}
  UserInfo.engine.name = UA.engine.name
  UserInfo.engine.version = UA.engine.version.split(".")[0]
  UserInfo.engine.fullVersion = UA.engine.version
  // 设备
  UserInfo.device={}
  UserInfo.device.vendor=UA.device.vendor
  UserInfo.device.type=UA.device.type
  UserInfo.device.model=UA.device.model
  // UA
  UserInfo.ua=UA.ua


  UserInfo = Object.assign(SUCCESS, UserInfo)
  res.status(200).send(utils.format(UserInfo))
})

module.exports = router
