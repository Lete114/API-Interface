const axios = require("axios");

module.exports = {
  async request(data) {
    const instance = axios.create()
    // 直接返回数据
    // instance.interceptors.response.use(res => {
    //   return res.data
    // })
    return instance(data)

  }
}



