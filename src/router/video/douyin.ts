import { parse } from 'path'
import { KV } from '../../types'
import { getRedirectUrl, getRequest, isHttp, isNumber, isUrl, throwUrlError } from '../../utils'

/* eslint-disable camelcase */
// eslint-disable-next-line max-statements
export = async (params: KV) => {
  const { url, type } = params

  let video_id = ''
  const result: {
    author: KV
    video?: KV
    images?: KV
    music: KV
    cover: KV
    redirect?: string
  } = {
    author: {},
    video: {},
    images: {},
    music: {},
    cover: {}
  }

  if (isNumber(url)) video_id = url
  else {
    if (!(isHttp(url) && isUrl(url))) throwUrlError()
    const { host, pathname } = new URL(url)

    if (host === 'v.douyin.com') {
      // https://www.iesdouyin.com/share/video/6810692411459718411/?...
      const redirect = await getRedirectUrl(url)
      // 获取请求路径内容，并提取视频ID
      const { pathname } = new URL(redirect)
      video_id = parse(pathname).name
    } else if (['www.douyin.com', 'www.iesdouyin.com'].includes(host)) {
      video_id = parse(pathname).name
    } else {
      throwUrlError()
    }
  }
  const douYinAPI = 'https://www.iesdouyin.com/web/api/v2/aweme/iteminfo/?item_ids=' + video_id
  const data = await getRequest(douYinAPI)
  // 视频ID错误，请求无内容
  if (data.item_list.length === 0) throwUrlError()
  const temp = data.item_list[0] // 定义 变量

  // 作者信息
  const author = temp.author
  result.author = {}
  result.author.nick = author.nickname // 昵称
  result.author.avatar = [] // 头像
  const avatar_thumb = author.avatar_thumb.url_list[0] // 小
  const avatar_medium = author.avatar_medium.url_list[0] // 中
  const avatar_larger = author.avatar_larger.url_list[0] // 大
  result.author.avatar.push(avatar_thumb, avatar_medium, avatar_larger)
  result.author.desc = author.signature // 签名

  if (!temp.images) {
    result.video = {}
    delete result.images
    // video_type: video

    // 标题
    result.video.title = temp.desc
    // 处理去除水印 playwm:有水印 play:无水印
    result.video.paly = []
    const play_addr = temp.video.play_addr.url_list[0] // 有水印
    const watermark = play_addr.replace('/playwm/', '/play/') // 无水印
    result.video.paly.push(watermark, play_addr)

    // 有动图(视频)
    result.cover.cover = temp.video.cover.url_list[0]
    result.cover.dynamic_cover = temp.video.dynamic_cover.url_list[0]
    result.cover.origin_cover = temp.video.origin_cover.url_list[0]
  }

  // 图片
  if (temp.images) {
    result.images = {}
    result.images.not_wm = []
    result.images.wm = []

    for (const value of temp.images) {
      result.images.not_wm.push(value.url_list[0]) // 无水印
      result.images.wm.push(value.download_url_list[0]) // 有水印
    }
  }

  // 音乐
  const music = temp.music
  result.music.author = music.author
  result.music.title = music.title
  result.music.play = music.play_url.url_list[0]
  result.music.cover = {}
  result.music.cover.cover_thumb = music.cover_thumb.url_list[0] // 小
  result.music.cover.cover_medium = music.cover_medium.url_list[0] // 中
  result.music.cover.cover_large = music.cover_large.url_list[0] // 大

  // 处理封面
  if (temp.images) {
    // video_type: image
    delete result.video

    // 没动图(图片)
    result.cover.cover = temp.video.cover.url_list[0]
    result.cover.origin_cover = temp.video.origin_cover.url_list[0]
  }
  if (type && result.video) result.redirect = result.video.paly[0]

  return result
}
/* eslint-enable camelcase*/
