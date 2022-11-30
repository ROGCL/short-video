const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave: false,
    // publicPath: '/media/page/painting/' 
         //记得打包时展开
    publicPath:'/media/page/painting_test/'
})