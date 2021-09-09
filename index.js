const express = require('express');

/**
 * 启动服务
 * @param {*} PORTS 服务端口
 */
module.exports = (PORTS) => {
  let app = express();
  app.use(express.urlencoded({ extended: true })) // 开启获取post请求参数
  const router = require("./src/router")// 路由
  router(app)

  // 静态资源
  app.use('/static',express.static(__dirname + '/public'));

  PORTS = PORTS || 5000

  console.log("[INFO] 已启动服务,请访问: http://localhost:" + PORTS);
  app.listen(PORTS);
}
