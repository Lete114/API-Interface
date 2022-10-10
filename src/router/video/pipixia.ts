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
    video: KV
    redirect?: string
  } = {
    author: {},
    video: {}
  }
  if (isNumber(url)) video_id = url
  else {
    if (!(isHttp(url) && isUrl(url))) throwUrlError()
    const { pathname } = new URL(url)
    const item_id = parse(pathname).name
    if (item_id) video_id = item_id

    if (!isNumber(video_id)) {
      const redirect = await getRedirectUrl(url)
      const { pathname } = new URL(redirect)
      video_id = parse(pathname).name
    }
  }
  const piPiXiaAPI = 'https://is.snssdk.com/bds/cell/detail/?cell_type=1&aid=1319&app_name=super&cell_id=' + video_id
  const data = await getRequest(piPiXiaAPI)
  // 无内容
  if (data.message !== 'success') throwUrlError()

  const temp = data.data.data.item
  // console.log(temp);

  // 作者信息
  result.author = {}
  result.author.nick = temp.author.name
  result.author.desc = temp.author.description
  result.author.avatar = []
  result.author.avatar.push(temp.author.avatar.url_list[0].url, temp.author.avatar.download_list[0].url)

  // 视频信息
  result.video = {}
  result.video.title = temp.content
  result.video.url = temp.origin_video_download.url_list[0].url
  // 处理封面
  result.video.cover = []
  temp.cover.url_list.forEach((item: KV) => {
    result.video.cover.push(item.url)
  })

  if (type && result.video.url) result.redirect = result.video.url

  return result
}
/* eslint-enable camelcase*/
