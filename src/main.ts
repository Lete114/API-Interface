import dotenv from 'dotenv'
dotenv.config()

import bing from './router/img/bing'
import qqAvatar from './router/qq/avatar'
import qqNick from './router/qq/nick'
import qqStatus from './router/qq/status'
import site from './router/site'
import videoDouyin from './router/video/douyin'
import videoHuoshan from './router/video/huoshan'
import videoPipixia from './router/video/pipixia'
import videoWeishi from './router/video/weishi'
import videoZuiyou from './router/video/zuiyou'
import { FN } from './types'

const api: FN = {
  site,
  bing,
  qqAvatar,
  qqNick,
  qqStatus,
  videoDouyin,
  videoHuoshan,
  videoPipixia,
  videoWeishi,
  videoZuiyou
}

export = api
