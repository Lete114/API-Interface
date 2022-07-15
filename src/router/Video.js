const express = require('express')
const router = express.Router()
const utils = require('../utils')
const { JSDOM } = require('jsdom')

const SUCCESS = utils.SUCCESS(),
  ERROR = utils.ERROR()

async function redirect_url(url) {
  let redirect = null
  await utils.request(url).then((response) => {
    redirect = response.request.res.responseUrl // 获取重定向后的地址
  })
  return redirect
}

router.get('/douyin', async (req, res) => {
  let { url, type } = req.query

  let result = {}
  let video_id = null
  let host = null
  const EXTRACT_ID = /\/video\/(\d+)/ // 提取url中的视频id

  if (!url) {
    res.status(400).send(utils.format({ code: 400, msg: '请输入分享的视频链接或视频ID' }))
    return
  }

  // 处理输入的参数是否合法
  try {
    // 是否属于数字(用于判断视频ID)
    if (!isNaN(url)) video_id = url
    else {
      /*
        获取分享链接的主机地址
        host：返回主机名和端口，localhost:3000
        hostname：返回主机名，localhost
      */
      let parse_url = new URL(url)
      host = parse_url.host

      if (host == 'v.douyin.com') {
        // 参数主机地址是否属于正确
        let redirect = await redirect_url(url)
        // 获取请求路径内容，并提取视频ID
        let pathname = new URL(redirect).pathname
        pathname.replace(EXTRACT_ID)
        video_id = RegExp.$1
      } else if (host == 'www.douyin.com' || host == 'www.iesdouyin.com') {
        let pathname = parse_url.pathname
        pathname.replace(EXTRACT_ID)
        video_id = RegExp.$1
      } else {
        res.status(400).send(utils.format({ code: 400, msg: '请输入正确的视频分享链接或视频ID' }))
        return
      }
    }
  } catch (error) {
    console.log('错误信息：', error)
    res.status(400).send(utils.format({ code: 400, msg: '请输入正确的视频分享链接或视频ID' }))
    return
  }

  let DouYinAPI = 'https://www.iesdouyin.com/web/api/v2/aweme/iteminfo/?item_ids=' + video_id
  await utils.request(DouYinAPI).then((response) => {
    // 视频ID错误，请求无内容
    if (response.data.item_list.length == 0) result = Object.assign(ERROR, result)
    // 视频ID正确，处理结果
    if (response.data.item_list.length != 0) {
      let temp = response.data.item_list[0] // 定义 变量

      // 作者信息
      let author = temp.author
      result.author = {}
      result.author.nick = author.nickname // 昵称
      result.author.avatar = [] // 头像
      let avatar_thumb = author.avatar_thumb.url_list[0] // 小
      let avatar_medium = author.avatar_medium.url_list[0] // 中
      let avatar_larger = author.avatar_larger.url_list[0] // 大
      result.author.avatar.push(avatar_thumb, avatar_medium, avatar_larger)
      result.author.desc = author.signature // 签名

      // 视频
      if (!temp.images) {
        result.video = {}
      }
      // 图片
      if (temp.images) {
        result.images = {}
        result.images.not_wm = []
        result.images.wm = []
      }

      // 音乐
      result.music = {}
      let music = temp.music
      result.music.author = music.author
      result.music.title = music.title
      result.music.play = music.play_url.url_list[0]
      result.music.cover = {}
      result.music.cover.cover_thumb = music.cover_thumb.url_list[0] // 小
      result.music.cover.cover_medium = music.cover_medium.url_list[0] // 中
      result.music.cover.cover_large = music.cover_large.url_list[0] // 大

      // 处理封面
      result.cover = {}
      if (temp.images) {
        // video_type: image

        for (const value of temp.images) {
          result.images.not_wm.push(value.url_list[0]) // 无水印
          result.images.wm.push(value.download_url_list[0]) // 有水印
        }

        // 没动图(图片)
        result.cover.cover = temp.video.cover.url_list[0]
        result.cover.origin_cover = temp.video.origin_cover.url_list[0]
      }
      if (!temp.images) {
        // video_type: video

        // 标题
        result.video.title = temp.desc
        // 处理去除水印 playwm:有水印 play:无水印
        result.video.paly = []
        let play_addr = temp.video.play_addr.url_list[0] // 有水印
        let watermark = play_addr.replace('/playwm/', '/play/') // 无水印
        result.video.paly.push(watermark, play_addr)

        // 有动图(视频)
        result.cover.cover = temp.video.cover.url_list[0]
        result.cover.dynamic_cover = temp.video.dynamic_cover.url_list[0]
        result.cover.origin_cover = temp.video.origin_cover.url_list[0]
      }
      result = Object.assign(SUCCESS, result)
    }
  })

  if (type === 'mp4') return res.redirect(result.video.paly[0])
  res.status(200).send(utils.format(result))
})

router.get('/huoshan', async (req, res) => {
  let url = req.query.url

  let video_id = null
  let result = {}

  try {
    if (!isNaN(url)) video_id = url
    else {
      let parse_url = new URL(url)
      video_id = parse_url.search.substring(1).split('=')[1] // 获取视频ID
      if (parse_url.host == 'share.huoshan.com') {
        let redirect = await redirect_url(url)
        let parse_url = new URL(redirect)
        video_id = parse_url.search.substring(1).split('&')[0].split('=')[1] // 获取视频ID
      }
    }
  } catch (error) {
    console.log('错误信息：', error)
    res.status(400).send(utils.format({ code: 400, msg: '请输入正确的视频分享链接或视频ID' }))
    return
  }

  let HuoShanAPI = 'https://share.huoshan.com/api/item/info?item_id=' + video_id
  await utils.request(HuoShanAPI).then((res) => {
    let data = res.data.data
    // 无内容
    if (!data) result = ERROR

    if (data) {
      // 解析url地址
      let parse_url = new URL(data.item_info.url)
      let video_id_temp = parse_url.search.substring(1).split('&')[0] // 获取返回参数
      let new_video_id = video_id_temp.split('=')[1] // 获取新视频ID
      result.video = []
      result.video.push('https://api-hl.huoshan.com/hotsoon/item/video/_playback/?video_id=' + new_video_id, data.item_info.url)
      result.cover = data.item_info.cover
      result = Object.assign(SUCCESS, result)
    }
  })

  res.status(200).send(utils.format(result))
})

router.get('/weishi', async (req, res) => {
  let url = req.query.url

  let video_id = null
  let result = {}

  try {
    let parse_url = new URL(url)
    let pathname = parse_url.pathname
    video_id = pathname.split('/')[3]
    if (parse_url.host == 'isee.weishi.qq.com') {
      // 由于get传值的特性，会识别分享链接中的‘&’符号
      // 即可得到分享链接中的视频ID
      video_id = req.query.id
    }
  } catch (error) {
    console.log('错误信息：', error)
    res.status(400).send(utils.format({ code: 400, msg: '请输入正确的视频分享链接' }))
    return
  }

  let WeiShiAPI = 'https://h5.weishi.qq.com/webapp/json/weishi/WSH5GetPlayPage?feedid=' + video_id
  await utils.request(WeiShiAPI).then((res) => {
    let data = res.data.data
    // 无内容
    if (data.feeds.length == 0) result = ERROR
    else {
      let temp = data.feeds[0]
      // 作者信息
      let author = {}
      result.author = author
      author.nick = temp.poster.nick
      author.sex = temp.poster.sex
      author.avatar = temp.poster.avatar
      author.age = temp.poster.age
      author.address = temp.poster.address
      author.desc = temp.poster.status
      author.qq = temp.poster.qq
      author.certif_desc = temp.poster.certif_desc

      // 视频信息
      let video = {}
      result.video = video
      video.url = temp.video_url
      video.music = temp.video_spec_urls[26].url
      video.title = temp.feed_desc_withat
      video.keywork = []
      temp.content_tags.forEach((item) => video.keywork.push(item.name))

      // 处理封面
      video.cover = []
      temp.images.forEach((item) => {
        let cover_info = {}
        cover_info.url = item.url
        cover_info.width = item.width
        cover_info.height = item.height
        cover_info.format = item.format
        video.cover.push(cover_info)
      })

      result = Object.assign(SUCCESS, result)
    }
  })

  res.status(200).send(utils.format(result))
})

router.get('/pipixia', async (req, res) => {
  let url = req.query.url

  let video_id = null
  let result = {}

  try {
    if (!isNaN(url)) video_id = url
    else {
      let parse_url = new URL(url)
      console.log(parse_url)
      video_id = parse_url.pathname.split('/')[2]
      // 重定向
      if (parse_url.host == 'h5.pipix.com') {
        let redirect = await redirect_url(url)
        let parse_url = new URL(redirect)
        video_id = parse_url.pathname.split('/')[2]
      }
    }
  } catch (error) {
    console.log('错误信息：', error)
    res.status(400).send(utils.format({ code: 400, msg: '请输入正确的视频分享链接' }))
    return
  }

  let PiPiXiaAPI = 'https://is.snssdk.com/bds/cell/detail/?cell_type=1&aid=1319&app_name=super&cell_id=' + video_id
  await utils.request(PiPiXiaAPI).then((res) => {
    let data = res.data
    // 无内容
    if (data.message != 'success') result = ERROR
    else {
      let temp = data.data.data.item
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
      let cover = temp.cover
      result.video.cover = []
      cover.url_list.forEach((item) => result.video.cover.push(item.url))
      result = Object.assign(SUCCESS, result)
    }
  })

  res.status(200).send(utils.format(result))
})

router.get('/zuiyou', async (req, res) => {
  let url = req.query.url

  let video_id = null
  let result = {}

  try {
    if (!isNaN(url)) video_id = url
    else {
      let parse_url = new URL(url)
      video_id = parse_url.search.substring(1).split('=')[1]
    }
  } catch (error) {
    console.log('错误信息：', error)
    res.status(400).send(utils.format({ code: 400, msg: '请输入正确的视频分享链接或视频ID' }))
    return
  }

  let ZuiYouAPI = 'https://share.izuiyou.com/hybrid/share/post?pid=' + video_id
  await utils.request(ZuiYouAPI).then((res) => {
    let data = res.data
    const dom = new JSDOM(data, { runScripts: 'dangerously' })
    let temp = dom.window.APP_INITIAL_STATE.sharePost.postDetail.post
    // 无内容
    if (!temp) result = ERROR
    else {
      // 作者信息
      let author = {}
      result.author = author
      author.name = temp.member.name
      author.sex = temp.member.gender
      author.desc = temp.member.sign
      author.cover = temp.member.coverUrls.origin.urls[0]
      author.avatar = []
      author.avatar.push(temp.member.avatarUrls.aspectLow.urls[0], temp.member.avatarUrls.origin.urls[0])

      // 视频信息
      let video = {}
      result.video = video
      video.title = temp.content
      let cover_id = temp.imgs[0].id
      video.url = temp.videos[cover_id].url
      video.music = temp.videos[cover_id].h265[0].urls[0].url
      video.cover = temp.videos[cover_id].coverUrls[0]

      result = Object.assign(SUCCESS, result)
    }
  })

  res.status(200).send(utils.format(result))
})

router.get('/bbq', async (req, res) => {
  let url = req.query.url

  let video_id = null
  let result = {}

  try {
    if (!isNaN(url)) video_id = url
    else {
      let parse_url = new URL(url)
      video_id = parse_url.search.substring(1).split('=')[1]
    }
  } catch (error) {
    console.log('错误信息：', error)
    res.status(400).send(utils.format({ code: 400, msg: '请输入正确的视频分享链接或视频ID' }))
    return
  }

  let bbqAPI = 'https://bbq.bilibili.com/bbq/app-bbq/sv/detail?svid=' + video_id
  await utils.request(bbqAPI).then((res) => {
    let data = res.data
    // 无内容
    if (!data.data) result = ERROR
    else {
      let temp = data.data

      // 作者信息
      let author = {}
      result.author = author
      author.id = temp.user_info.mid
      author.nick = temp.user_info.uname
      author.desc = temp.user_info.signature
      author.avatar = temp.user_info.face
      author.pendant_name = temp.user_info.dress.pendants.name
      author.pendant = temp.user_info.dress.pendants.img_url

      // 视频信息
      let video = {}
      result.video = video
      video.pubtime = temp.pubtime
      video.title = temp.title
      video.url = temp.play.url
      video.cover = temp.home_img_url

      result = Object.assign(SUCCESS, result)
    }
  })

  res.status(200).send(utils.format(result))
})

// 由于官方对频繁请求有一定限制
// 请求次数在3-5次之间就会返回滑块验证
// 感兴趣的可以去研究研究(欢迎您的pr)
router.get('/kuaishou', async (req, res) => {
  let url = req.query.url

  let video_id = null
  let result = {}

  try {
    let parse_url = new URL(url)
    video_id = parse_url.pathname.split('/')[2]
    if (parse_url.host == 'v.kuaishou.com') {
      let redirect = await redirect_url(url)
      let parse_url = new URL(redirect)
      video_id = parse_url.pathname.split('/')[2]
    }
  } catch (error) {
    console.log('错误信息：', error)
    res.status(400).send(utils.format({ code: 400, msg: '请输入正确的视频分享链接或视频ID' }))
    return
  }

  let KuaiShouAPI = 'https://www.kuaishou.com/graphql'
  let KuaiShouQuery =
    'query visionVideoDetail($photoId: String, $type: String, $page: String, $webPageArea: String) {\n  visionVideoDetail(photoId: $photoId, type: $type, page: $page, webPageArea: $webPageArea) {\n    status\n    type\n    author {\n      id\n      name\n      following\n      headerUrl\n      __typename\n    }\n    photo {\n      id\n      duration\n      caption\n      likeCount\n      realLikeCount\n      coverUrl\n      photoUrl\n      liked\n      timestamp\n      expTag\n      llsid\n      viewCount\n      videoRatio\n      stereoType\n      croppedPhotoUrl\n      manifest {\n        mediaType\n        businessType\n        version\n        adaptationSet {\n          id\n          duration\n          representation {\n            id\n            defaultSelect\n            backupUrl\n            codecs\n            url\n            height\n            width\n            avgBitrate\n            maxBitrate\n            m3u8Slice\n            qualityType\n            qualityLabel\n            frameRate\n            featureP2sp\n            hidden\n            disableAdaptive\n            __typename\n          }\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    tags {\n      type\n      name\n      __typename\n    }\n    commentLimit {\n      canAddComment\n      __typename\n    }\n    llsid\n    danmakuSwitch\n    __typename\n  }\n}\n'
  let json = {
    method: 'post',
    url: KuaiShouAPI,
    data: {
      operationName: 'visionVideoDetail',
      variables: {
        photoId: video_id,
        page: 'detail'
      },
      query: KuaiShouQuery
    }
  }
  await utils.request(json).then((res) => {
    let data = res.data
    // 无内容
    if (!data.data.visionVideoDetail) result = ERROR
    else {
      let temp = data.data.visionVideoDetail
      // 作者信息
      result.author = {}
      result.author.id = temp.author.id
      result.author.nick = temp.author.name
      result.author.avatar = temp.author.headerUrl

      // 视频信息
      result.video = {}
      result.video.id = temp.photo.id
      result.video.timestamp = temp.photo.timestamp
      result.video.duration = temp.photo.duration
      result.video.likeCount = temp.photo.likeCount
      result.video.viewCount = temp.photo.viewCount
      result.video.realLikeCount = temp.photo.realLikeCount
      result.video.cover = temp.photo.coverUrl
      result.video.url = temp.photo.photoUrl
      result.video.title = temp.photo.caption
      // 标签
      result.video.tags = []
      temp.tags.forEach((item) => result.video.tags.push(item.name))

      console.log(result)

      result = Object.assign(SUCCESS, data)
    }
  })

  res.status(200).send(utils.format(result))
})

module.exports = router
