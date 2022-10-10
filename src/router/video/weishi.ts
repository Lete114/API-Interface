import { KV } from '../../types'
import { getRequest, isHttp, isNumber, isUrl, throwUrlError } from '../../utils'

/* eslint-disable camelcase */
// eslint-disable-next-line max-statements
export = async (params: KV) => {
  const { url, id, type } = params
  let video_id = ''
  const result: {
    author: KV
    video: KV
    redirect?: string
  } = {
    author: {},
    video: {}
  }

  if (isNumber(url)) video_id = url
  else {
    if (!(isHttp(url) && isUrl(url))) throwUrlError()
    const { host } = new URL(url)
    if (host === 'isee.weishi.qq.com') {
      // 由于get传值的特性，会识别分享链接中的‘&’符号
      // 即可得到分享链接中的视频ID
      video_id = id
    }
  }

  const weiShiAPI = 'https://h5.weishi.qq.com/webapp/json/weishi/WSH5GetPlayPage?feedid=' + video_id
  const { data } = await getRequest(weiShiAPI)
  // 无内容
  if (data.feeds.length === 0) throwUrlError()
  else {
    const temp = data.feeds[0]
    // 作者信息
    result.author = {}
    result.author.nick = temp.poster.nick
    result.author.sex = temp.poster.sex
    result.author.avatar = temp.poster.avatar
    result.author.age = temp.poster.age
    result.author.address = temp.poster.address
    result.author.desc = temp.poster.status
    result.author.qq = temp.poster.qq
    result.author.certif_desc = temp.poster.certif_desc

    // 视频信息
    result.video = {}
    result.video.url = temp.video_url
    result.video.music = temp.video_spec_urls[26].url
    result.video.title = temp.feed_desc_withat
    result.video.keywork = []
    temp.content_tags.forEach((item: KV) => result.video.keywork.push(item.name))

    // 处理封面
    result.video.cover = []
    temp.images.forEach((item: KV) => {
      const cover_info: KV = {}
      cover_info.url = item.url
      cover_info.width = item.width
      cover_info.height = item.height
      cover_info.format = item.format
      result.video.cover.push(cover_info)
    })
  }

  if (type && result.video.url) result.redirect = result.video.url

  return result
}
/* eslint-enable camelcase*/
