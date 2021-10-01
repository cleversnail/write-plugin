const HtmlWebpackPlugin = require('html-webpack-plugin');

class StampPlugin { // 创建一个时间戳插件
  apply(compiler) {
    // 使用 compilation 生命周期保证 plugin 执行在 文件创建之前
    // compiler 创建的 compilation 对象在回调中被使用
    compiler.hooks.compilation.tap('StampWebpackPlugin', (compilation, callback) => { // 注册一个StampWebpackPlugin方法
      // HtmlWebpackPlugin在webpack刚创建编译的时候，自己执行到往 html文件插入script标签之前
      HtmlWebpackPlugin.getHooks(compilation).beforeAssetTagGeneration.tap('StampWebpackPlugin', 
        (htmlPluginData, cb) => {
          // console.log(htmlPluginData);
          let jsSrc = htmlPluginData.assets.js[0]
          // 直接修改js数组内的元素
          htmlPluginData.assets.js[0] = `${jsSrc}?${new Date().getTime()}`
        }
      )
      
      
      
      // 测试compilation对象在模块构建之前能得到什么
      // 将逻辑注册在同一个 StampWebpackPlugin 方法上
      // compilation.hooks.buildModule.tap('StampWebpackPlugin',
      //   (data, cb) => {
      //     console.log(data);
      //   })
    })
  }
}

module.exports = StampPlugin