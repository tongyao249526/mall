
module.exports = {
      publicPath: '/',
      assetsDir: "assets",
      devServer: {
        proxy: {
          "/api": {
            target: "http://127.0.0.1:3000",//目标主机 
            changeOrigin: true,//需要虚拟主机站点 
            pathRewrite: {//重写路径
              "^/api": ''
            }
          },
        }
      },
      lintOnSave:false,
}