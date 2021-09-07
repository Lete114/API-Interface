<template>
  <template v-for="item in InfoList">
    <template v-if="item.path == path">
      <div class="title info" v-text="item.data.title"></div>
      <div class="methods info">
        <strong>请求方式: </strong>
        <span v-text="item.data.request"></span>
      </div>
      <div class="url info">
        <strong>请求地址: </strong>
        <span v-text="item.data.url"></span>
      </div>
      <div class="example info">
        <strong>请求示例: </strong>
        <span v-text="item.data.example"></span>
      </div>
    </template>
  </template>
</template>

<script>
export default {
  data() {
    return {
      path: this.$route.query.path,
      InfoList: [
        {
          path: '/user',
          data: {
            title: '获取请求者信息',
            request: 'GET/POST',
            url: location.origin + '/user',
            example: location.origin + '/user'
          }
        },
        {
          path: '/bing',
          data: {
            title: '获取Bing每日高清壁纸',
            request: 'GET/POST',
            url: location.origin + '/bing',
            example: location.origin + '/bing?cn=true',
            args: [
              {
                isFill: false,
                type: 'String',
                description: '是否使用国内请求(针对于服务器位置，而不是请求者位置)'
              }
            ]
          }
        },
        {
          path: '/site/info',
          data: {
            title: '获取网站信息',
            request: 'GET/POST',
            url: location.origin + '/site',
            example: location.origin + '/site?url=https://www.imlete.cn',
            args: [
              {
                isFill: false,
                type: 'String',
                description: '是否使用国内请求(针对于服务器位置，而不是请求者位置)'
              }
            ]
          }
        },
        {
          path: '/site/favicon',
          data: {
            title: '获取网站图标',
            request: 'GET/POST',
            url: location.origin + '/site/favicon',
            example: location.origin + '/site/favicon?url=https://www.imlete.cn'
          }
        },
        {
          path: '/qq/info',
          data: {
            title: '获取QQ信息',
            request: 'GET/POST',
            url: location.origin + '/qq',
            example: location.origin + '/qq/10011'
          }
        },
        {
          path: '/qq/avatar',
          data: {
            title: '获取QQ头像',
            request: 'GET/POST',
            url: location.origin + '/qq/avatar',
            example: location.origin + '/qq/avatar/10011'
          }
        },
        {
          path: '/qq/avatarAll',
          data: {
            title: '获取QQ所有头像',
            request: 'GET/POST',
            url: location.origin + '/qq/avatar/all',
            example: location.origin + '/qq/avatar/all/10011'
          }
        },
        {
          path: '/qq/nick',
          data: {
            title: '获取QQ昵称',
            request: 'GET/POST',
            url: location.origin + '/qq/nick',
            example: location.origin + '/qq/nick/10011'
          }
        },
        {
          path: '/qq/status',
          data: {
            title: '获取QQ电脑在线状态',
            request: 'GET/POST',
            url: location.origin + '/qq/status',
            example: location.origin + '/qq/status/10011'
          }
        },
        {
          path: '/video/douyin',
          data: {
            title: '获取抖音视频信息',
            request: 'GET/POST',
            url: location.origin + '/video/douyin',
            example: location.origin + '/video/douyin?url=https://v.douyin.com/d6g6pH2/'
          }
        },
        {
          path: '/video/huoshan',
          data: {
            title: '获取火山视频信息',
            request: 'GET/POST',
            url: location.origin + '/video/huoshan',
            example: location.origin + '/video/huoshan?url=分享连接'
          }
        },
        {
          path: '/video/weishi',
          data: {
            title: '获取微视视频信息',
            request: 'GET/POST',
            url: location.origin + '/video/weishi',
            example: location.origin + '/video/weishi?url=分享连接'
          }
        },
        {
          path: '/video/pipixia',
          data: {
            title: '获取皮皮虾视频信息',
            request: 'GET/POST',
            url: location.origin + '/video/pipixia',
            example: location.origin + '/video/pipixia?url=分享连接'
          }
        },
        {
          path: '/video/zuiyou',
          data: {
            title: '获取最右视频信息',
            request: 'GET/POST',
            url: location.origin + '/video/zuiyou',
            example: location.origin + '/video/zuiyou?url=分享连接'
          }
        },
        {
          path: '/video/bbq',
          data: {
            title: '获取轻视频信息',
            request: 'GET/POST',
            url: location.origin + '/video/bbq',
            example: location.origin + '/video/bbq?url=分享连接'
          }
        }
        // {
        //   path: '/video/kuaishou',
        //   data: {
        //     title: '获取快手视频信息',
        //     request: 'GET/POST',
        //     url: location.origin + '/video/kuaishou',
        //     example: location.origin + '/video/kuaishou?url=分享连接'
        //   }
        // }
      ]
    }
  }
}
</script>

<style scoped>
.info {
  margin: 0.625rem 0 /* 10/16 */;
}
.title {
  text-align: center;
  font-weight: 800;
  font-size: 1.5rem /* 24/16 */;
  margin-bottom: 3rem;
}
</style>
