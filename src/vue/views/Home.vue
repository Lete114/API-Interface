<template>
  <template v-for="item in apiList">
    <div class="type-title" v-text="item.typeTitle"></div>
    <div class="row">
      <template v-for="api in item.list">
        <div class="col">
          <router-link :to="{ path: '/info', query: { path: api.path } }">
            <div class="api-title" v-text="api.title"></div>
            <div class="api-description" v-text="api.description"></div>
          </router-link>
        </div>
      </template>
    </div>
  </template>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      apiList: {
        user: {
          typeTitle: '请求信息',
          list: [
            {
              path: '/user',
              title: '获取用户信息',
              description: '获取请求者的用户信息'
            }
          ]
        },
        bing: {
          typeTitle: 'Bing',
          list: [
            {
              path: '/bing',
              title: 'Bing每日壁纸',
              description: '获取Bing每日高清壁纸'
            }
          ]
        },
        site: {
          typeTitle: '网站信息',
          list: [
            {
              path: '/site/info',
              title: '获取网站信息',
              description: '获取网站信息：title、description、keyword'
            },
            {
              path: '/site/favicon',
              title: '获取网站图标',
              description: '获取网站图标：favicon'
            }
          ]
        },
        qq: {
          typeTitle: 'QQ信息',
          list: [
            {
              path: '/qq/info',
              title: '获取QQ信息',
              description: '获取QQ信息：nick、status、avatar'
            },
            {
              path: '/qq/avatar',
              title: '获取QQ头像',
              description: '获取QQ头像：avatar'
            },
            {
              path: '/qq/avatarAll',
              title: '获取QQ所有头像',
              description: '获取QQ所有头像：avatarAll'
            },
            {
              path: '/qq/nick',
              title: '获取QQ昵称',
              description: '获取QQ昵称：nick'
            },
            {
              path: '/qq/status',
              title: '获取QQ电脑在线状态',
              description: '获取QQ电脑在线状态：status'
            }
          ]
        },
        video: {
          typeTitle: '短视频去水印',
          list: [
            {
              path: '/video/douyin',
              title: '抖音去水印',
              description: '获取视频信息'
            },
            {
              path: '/video/huoshan',
              title: '火山短视频',
              description: '获取视频信息'
            },
            {
              path: '/video/weishi',
              title: '微视短视频',
              description: '获取视频信息'
            },
            {
              path: '/video/pipixia',
              title: '皮皮虾短视频',
              description: '获取视频信息'
            },
            {
              path: '/video/zuiyou',
              title: '最右短视频',
              description: '获取视频信息'
            },
            {
              path: '/video/bbq',
              title: '轻视频(bilibili)',
              description: '获取视频信息'
            },
            {
              path: '/video/kuaishou',
              title: '快手短视频',
              description: '获取视频信息'
            }
          ]
        }
      }
    }
  }
}
</script>

<style scoped>
.type-title {
  font-size: 1.2rem;
  font-weight: 500;
  margin-top: 1.6rem;
}

.row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.col {
  border-radius: 10px;
  padding: 1rem /* 16/16 */;
  margin: 0.6rem 1rem 0 0;
  line-height: 1.4rem;
  max-width: 12.5rem /* 200/16 */;
  min-width: 6.25rem /* 100/16 */;
  background: #fff;
}

.col a {
  text-decoration: none;
}

.api-title {
  color: #373e4a;
  font-size: 0.9rem;
  font-weight: 500;
}

.api-description {
  color: #979898;
  font-size: 0.8rem;
}
</style>
