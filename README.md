<h1 align="center"><a href="https://github.com/lete114/API-Interface" target="_blank">API-Interface</a></h1>

<p align="center">
    <a href="https://github.com/lete114/API-Interface/releases/"><img src="https://img.shields.io/github/package-json/v/lete114/API-Interface/master?color=%23e58a8a&label=master" alt="master"></a>
    <a href="https://github.com/lete114/API-Interface/blob/master/LICENSE"><img src="https://img.shields.io/github/license/lete114/API-Interface?color=FF5531" alt="MIT License"></a>
</p>

## 目录

- [目录](#目录)
- [服务器部署](#服务器部署)
- [嵌入其它项目](#嵌入其它项目)
- [API](#API)
- - [site - 获取网站内容](#site)
- - [bing - 获取 Bing 每日壁纸](#bing)
- - [qqAvatar - 获取 QQ 头像](#qqAvatar)
- - [qqNick - 获取 QQ 昵称](#qqNick)
- - [qqStatus - 获取 QQ 电脑在线状态](#qqStatus)
- - [videoDouyin - 获取抖音视频信息](#videoDouyin)
- - [videoHuoshan - 获取抖音火山版视频信息](#videoHuoshan)
- - [videoPipixia - 获取皮皮虾视频信息](#videoPipixia)
- - [videoWeishi - 获取微视视频信息](#videoWeishi)
- - [videoZuiyou - 获取最右视频信息](#videoZuiyou)

## 服务器部署

- [返回列表目录](#目录)

```bash
git clone https://github.com/Lete114/API-Interface.git API-Interface ## 克隆源码
cd API-Interface
npm install ## 安装依赖
npm run start ## 启动服务
```

## 嵌入其它项目

- [返回列表目录](#目录)

安装

```bash
npm i api-interface
```

引入

```js
const APIInterface = require('api-interface')

APIInterface.bing({}).then((res) => {
  console.log('res', res)
  // res {
  //   startdate: '2022-10-09',
  //   enddate: '2022-10-10',
  //   title: '穿越意大利峡湾之旅',
  //   copyright: '瓦伦蒂诺大坝，意大利伦巴第大区布雷西亚省 (© wmaster890/Getty Images)',
  //   cover: [
  //     'https://www.bing.com/th?id=OHR.ValvestinoDam_ZH-CN8397604653_UHD.jpg',
  //     'https://www.bing.com/th?id=OHR.ValvestinoDam_ZH-CN8397604653_1920x1200.jpg',
  //     'https://www.bing.com/th?id=OHR.ValvestinoDam_ZH-CN8397604653_1920x1080.jpg',
  //     'https://www.bing.com/th?id=OHR.ValvestinoDam_ZH-CN8397604653_1366x768.jpg',
  //     'https://www.bing.com/th?id=OHR.ValvestinoDam_ZH-CN8397604653_1280x768.jpg',
  //     'https://www.bing.com/th?id=OHR.ValvestinoDam_ZH-CN8397604653_1024x768.jpg',
  //     'https://www.bing.com/th?id=OHR.ValvestinoDam_ZH-CN8397604653_800x600.jpg',
  //     'https://www.bing.com/th?id=OHR.ValvestinoDam_ZH-CN8397604653_800x480.jpg',
  //     'https://www.bing.com/th?id=OHR.ValvestinoDam_ZH-CN8397604653_768x1280.jpg',
  //     'https://www.bing.com/th?id=OHR.ValvestinoDam_ZH-CN8397604653_720x1280.jpg',
  //     'https://www.bing.com/th?id=OHR.ValvestinoDam_ZH-CN8397604653_640x480.jpg',
  //     'https://www.bing.com/th?id=OHR.ValvestinoDam_ZH-CN8397604653_480x800.jpg',
  //     'https://www.bing.com/th?id=OHR.ValvestinoDam_ZH-CN8397604653_400x240.jpg',
  //     'https://www.bing.com/th?id=OHR.ValvestinoDam_ZH-CN8397604653_320x240.jpg',
  //     'https://www.bing.com/th?id=OHR.ValvestinoDam_ZH-CN8397604653_240x320.jpg'
  //   ]
  // }
})

APIInterface.videoDouyin({ url: 'https://v.douyin.com/MNHBD8d/' }).then((res) => {
  console.log('res', res)
  // res {
  //   author: {
  //     nick: '王玉萌',
  //     avatar: [
  //       'https://p26.douyinpic.com/aweme/100x100/aweme-avatar/tos-cn-avt-0015_14a12a9ab604700dbefc5ec4094026ea.jpeg?from=116350172',
  //       'https://p3.douyinpic.com/aweme/720x720/aweme-avatar/tos-cn-avt-0015_14a12a9ab604700dbefc5ec4094026ea.jpeg?from=116350172',
  //       'https://p6.douyinpic.com/aweme/1080x1080/aweme-avatar/tos-cn-avt-0015_14a12a9ab604700dbefc5ec4094026ea.jpeg?from=116350172'
  //     ],
  //     desc: '抖音音乐木星计划成员\n' +
  //       '今日直播时间：晚22:30-3:00\n' +
  //       'wb🧣：还在努力的王玉萌\n' +
  //       '网易云/酷狗/Q：王玉萌 \n' +
  //       '合作🌟：hz-flow16\n' +
  //       '不玩回森 有事wb私信'
  //   },
  //   video: {
  //     title: '辛巴巴巴噜比啦～ #симпа #辛巴巴巴噜比啦  #q音宝藏',
  //     paly: [
  //       'https://aweme.snssdk.com/aweme/v1/play/?video_id=v0200f810000c0n4c4vtij5kpv3luijg&ratio=720p&line=0',
  //       'https://aweme.snssdk.com/aweme/v1/playwm/?video_id=v0200f810000c0n4c4vtij5kpv3luijg&ratio=720p&line=0'
  //     ]
  //   },
  //   music: {
  //     author: '王玉萌',
  //     title: '歌名_Симпа一王玉萌（原声中的歌曲：Simpa Pa Pa-Citethsea）',
  //     play: 'https://sf3-cdn-tos.douyinstatic.com/obj/ies-music/6930554295213443848.mp3',
  //     cover: {
  //       cover_thumb: 'https://p26.douyinpic.com/img/aweme-avatar/tos-cn-avt-0015_14a12a9ab604700dbefc5ec4094026ea~c5_168x168.jpeg?from=116350172',
  //       cover_medium: 'https://p3.douyinpic.com/aweme/720x720/aweme-avatar/tos-cn-avt-0015_14a12a9ab604700dbefc5ec4094026ea.jpeg?from=116350172',
  //       cover_large: 'https://p11.douyinpic.com/aweme/1080x1080/aweme-avatar/tos-cn-avt-0015_14a12a9ab604700dbefc5ec4094026ea.jpeg?from=116350172'
  //     }
  //   },
  //   cover: {
  //     cover: 'https://p26-sign.douyinpic.com/tos-cn-p-0015/7c780d935f8447f282a0f3fd30caa9ea_1613645426~c5_300x400.jpeg?x-expires=1666584000&x-signature=4sdDi1nxZJPFQ4AfD5Ccx37Nyss%3D&from=3213915784_large&s=PackSourceEnum_DOUYIN_REFLOW&se=false&sc=cover&l=202210101210170102080451553E3F2B16',
  //     dynamic_cover: 'https://p26-sign.douyinpic.com/obj/tos-cn-p-0015/e38001afd4234dfebdf7db697ad4bc91_1613645425?x-expires=1666584000&x-signature=ElxLZu5dgF3NJCGsPQjpX7eBYAY%3D&from=3213915784_large',
  //     origin_cover: 'https://p26-sign.douyinpic.com/tos-cn-p-0015/83d5433d7c114ce8915eca796073f846_1613645425~tplv-dy-360p.jpeg?x-expires=1666584000&x-signature=odnv8PJ7%2BHLN4XkeAk3f47linCc%3D&from=3213915784&se=false&biz_tag=feed_cover&l=202210101210170102080451553E3F2B16'
  //   }
  // }
})
```

## API

请求方法: GET

响应内容: JSON

### site - 获取网站内容

- [返回列表目录](#目录)

请求参数

| 昵称 | 必填 | 类型   | 描述                                                                                                   |
| ---- | ---- | ------ | ------------------------------------------------------------------------------------------------------ |
| url  | ✅   | string | 请求的网站                                                                                             |
| type |      | string | 当该字段等于 `image` 时，返回参数会新增一个 `redirect` 值为网站的 `favicon` 地址，同时会重定向到该地址 |

### bing - 获取 Bing 每日壁纸

- [返回列表目录](#目录)

请求参数

| 昵称   | 必填 | 类型   | 描述                                                                                                                           |
| ------ | ---- | ------ | ------------------------------------------------------------------------------------------------------------------------------ |
| region |      | string | Bing 每日壁纸的不同地区，每个地区的壁纸都不一样，默认: `en-US`，可选: `zh-CN, en-US, ja-JP, en-AU, en-UK, de-DE, en-NZ, en-CA` |
| type   |      | string | 当该字段等于 `image` 时，返回参数会新增一个 `redirect` 值为壁纸的地址，同时会重定向到该地址                                    |
| date   |      | string | 指定一个日期，获取这个日期的壁纸，目测只能获取当前日期的前 10 天的壁纸                                                         |
| dpi    |      | string | 修改 `redirect` 默认的壁纸分辨率                                                                                               |

### qqAvatar - 获取 QQ 头像

- [返回列表目录](#目录)

  请求参数

| 昵称 | 必填 | 类型   | 描述                                                                                        |
| ---- | ---- | ------ | ------------------------------------------------------------------------------------------- |
| qq   | ✅   | string | 要获取的 QQ 号头像                                                                          |
| type |      | string | 当该字段等于 `image` 时，返回参数会新增一个 `redirect` 值为头像的地址，同时会重定向到该地址 |

### qqNick - 获取 QQ 昵称

- [返回列表目录](#目录)

  请求参数

| 昵称 | 必填 | 类型   | 描述               |
| ---- | ---- | ------ | ------------------ |
| qq   | ✅   | string | 要获取的 QQ 号头像 |

### qqStatus - 获取 QQ 电脑在线状态

- [返回列表目录](#目录)

  请求参数

| 昵称 | 必填 | 类型   | 描述               |
| ---- | ---- | ------ | ------------------ |
| qq   | ✅   | string | 要获取的 QQ 号头像 |

### videoDouyin - 获取抖音视频信息

- [返回列表目录](#目录)

  请求参数

| 昵称 | 必填 | 类型   | 描述                                                                                        |
| ---- | ---- | ------ | ------------------------------------------------------------------------------------------- |
| url  | ✅   | string | 可以是分享的短链接、长链接、视频 ID                                                         |
| type |      | string | 当该字段等于 `image` 时，返回参数会新增一个 `redirect` 值为视频的地址，同时会重定向到该地址 |

### videoHuoshan - 获取抖音火山版视频信息

- [返回列表目录](#目录)

  请求参数

| 昵称 | 必填 | 类型   | 描述                                                                                        |
| ---- | ---- | ------ | ------------------------------------------------------------------------------------------- |
| url  | ✅   | string | 可以是分享的短链接、长链接、视频 ID                                                         |
| type |      | string | 当该字段等于 `image` 时，返回参数会新增一个 `redirect` 值为视频的地址，同时会重定向到该地址 |

### videoPipixia - 获取皮皮虾视频信息

- [返回列表目录](#目录)

  请求参数

| 昵称 | 必填 | 类型   | 描述                                                                                        |
| ---- | ---- | ------ | ------------------------------------------------------------------------------------------- |
| url  | ✅   | string | 可以是分享的短链接、长链接、视频 ID                                                         |
| type |      | string | 当该字段等于 `image` 时，返回参数会新增一个 `redirect` 值为视频的地址，同时会重定向到该地址 |

### videoWeishi - 获取微视视频信息

- [返回列表目录](#目录)

  请求参数

| 昵称 | 必填 | 类型   | 描述                                                                                        |
| ---- | ---- | ------ | ------------------------------------------------------------------------------------------- |
| url  | ✅   | string | 可以是分享的链接、视频 ID                                                                   |
| type |      | string | 当该字段等于 `image` 时，返回参数会新增一个 `redirect` 值为视频的地址，同时会重定向到该地址 |

### videoZuiyou - 获取最右视频信息

- [返回列表目录](#目录)

  请求参数

| 昵称 | 必填 | 类型   | 描述                                                                                        |
| ---- | ---- | ------ | ------------------------------------------------------------------------------------------- |
| url  | ✅   | string | 可以是分享的链接、视频 ID                                                                   |
| type |      | string | 当该字段等于 `image` 时，返回参数会新增一个 `redirect` 值为视频的地址，同时会重定向到该地址 |
