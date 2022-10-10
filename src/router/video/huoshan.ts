import { KV } from '../../types'
import { getRedirectUrl, getRequest, isHttp, isNumber, isUrl, throwUrlError } from '../../utils'

/* eslint-disable camelcase */
// eslint-disable-next-line max-statements
export = async (params: KV) => {
  const { url, type } = params
  let video_id = ''
  const result: {
    video: string
    cover: string
    redirect: string
  } = {
    video: '',
    cover: '',
    redirect: ''
  }

  if (isNumber(url)) video_id = url
  else {
    if (!(isHttp(url) && isUrl(url))) throwUrlError()
    const { searchParams } = new URL(url)
    const item_id = searchParams.get('item_id')

    if (item_id) video_id = item_id
    else {
      const redirect = await getRedirectUrl(url)
      const { searchParams } = new URL(redirect)
      video_id = searchParams.get('item_id') || ''
    }
  }
  const huoShanAPI = 'https://share.huoshan.com/api/item/info?item_id=' + video_id
  const { data } = await getRequest(huoShanAPI)
  // 无内容
  if (!data) throwUrlError()

  // 解析url地址
  result.video = data.item_info.url
  result.cover = data.item_info.cover
  if (type && result.video) result.redirect = result.video

  return result
}
/* eslint-enable camelcase*/
