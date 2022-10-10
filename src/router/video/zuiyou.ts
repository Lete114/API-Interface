import { JSDOM } from 'jsdom'
import { KV } from '../../types'
import { getRequest, isHttp, isNumber, isUrl, throwUrlError } from '../../utils'

/* eslint-disable camelcase */
// eslint-disable-next-line max-statements
export = async (params: KV) => {
  const { url, type } = params
  let video_id = ''
  const result: {
    author: KV
    video: KV
    redirect?: string
  } = {
    author: {},
    video: {},
    redirect: ''
  }

  if (isNumber(url)) video_id = url
  else {
    if (!(isHttp(url) && isUrl(url))) throwUrlError()
    const { searchParams } = new URL(url)
    const pid = searchParams.get('pid') || ''
    video_id = pid
  }
  const zuiYouAPI = 'https://share.izuiyou.com/hybrid/share/post?pid=' + video_id
  const { raw } = await getRequest(zuiYouAPI)
  const dom = new JSDOM(raw, { runScripts: 'dangerously' })
  const data = dom.window.APP_INITIAL_STATE.sharePost.postDetail.post

  // 无内容
  if (!data) throwUrlError()

  // 作者信息
  result.author = {}
  result.author.name = data.member.name
  result.author.sex = data.member.gender
  result.author.desc = data.member.sign
  result.author.cover = data.member.coverUrls.origin.urls[0]
  result.author.avatar = []
  result.author.avatar.push(data.member.avatarUrls.aspectLow.urls[0], data.member.avatarUrls.origin.urls[0])

  // 视频信息
  result.video = {}
  result.video.title = data.content
  const cover_id = data.imgs[0].id
  result.video.url = data.videos[cover_id].url
  result.video.music = data.videos[cover_id].h265[0].urls[0].url
  result.video.cover = data.videos[cover_id].coverUrls[0]
  if (type && result.video.url) result.redirect = result.video.url

  return result
}
/* eslint-enable camelcase*/
