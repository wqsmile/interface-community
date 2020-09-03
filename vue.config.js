// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// const CompressionWebpackPlugin = require('compression-webpack-plugin')
// const path = require('path')
// const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://breath.host',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  publicPath: './',
  productionSourceMap: false,
  // configureWebpack: config => {
  //   if (isProduction) {
      // 代码压缩 UglifyJsPlugin打包有问题，可能是es6语法的原因，暂没解决
      // config.plugins.push(
      //   new UglifyJsPlugin({
      //     uglifyOptions: {
      //       compress: {
      //         // warnings: false,
      //         drop_debugger: true,
      //         drop_console: true,
      //         pure_funcs: ['console.log']
      //       }
      //     },
      //     sourceMap: false,
      //     parallel: true
      //   })
      // )
      // config.module.rules.push({
      //   test: /\.js$/,
      //   loader: 'babel-loader',
      //   include: [
      //     path.resolve(__dirname, './src'),
      //     path.resolve(__dirname, './node_modules/element-ui/packages'), 
      //     path.resolve(__dirname, './node_modules/element-ui/src')
      //   ]
      // })
      // gzip压缩
      // const productionGzipExtensions = ['html', 'js', 'css']
      // config.plugins.push(
      //   new CompressionWebpackPlugin({
      //     filename: '[path].gz[query]',
      //     algorithm: 'gzip',
      //     test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
      //     threshold: 10240,
      //     minRatio: 0.8,
      //     deleteOriginalAssets: false // 删除原文件
      //   })
      // )

      // 公共代码抽离
      // config.optimization = {
      //   splitChunks: {
      //     cacheGroups: {
      //       vender: {
      //         chunks: 'all',
      //         test: /node_modules/,
      //         name: 'vendor',
      //         minChunks: 1,
      //         maxInitialRequests: 5,
      //         minSize: 0,
      //         priority: 100
      //       },
      //       common: {
      //         chunks: 'all',
      //         test: /[\\/]src[\\/]js[\\/]/,
      //         name: 'common',
      //         minChunks: 2,
      //         maxInitialRequests: 5,
      //         minSize: 0,
      //         priority: 60
      //       },
      //       styles: {
      //           name: 'styles',
      //           test: /\.(le|sa|sc|c)ss$/,
      //           chunks: 'all',
      //           enforce: true
      //       },
      //       runtimeChunk: {
      //           name: 'manifest'
      //       }
      //     }
      //   }
      // }
  //   }
  // }
}