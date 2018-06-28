'use strict'
require('./check-versions')()
require('./check-args')()
// 加载版本控制的代码
// 设置node的环境变量为生产环境, 由check-args解析命令行参数传入--NODE_ENV=prod
// process.env.NODE_ENV = 'prod'
process.env.OPT = 'build'
// node环境打包进度给出的文字
const ora = require('ora')
// node环境下清除文件的包
const rm = require('rimraf')
// node环境下引入路径处理的包
const path = require('path')
// 控制台的日志输出
const chalk = require('chalk')
// 引入webpack打包工具
const webpack = require('webpack')
// 引入配置文件
const config = require('../config')
// 引入生产环境的配置文件
const webpackConfig = require('./webpack.prod.conf')
// 在控制台输出正在构建测试环境的文件
const spinner = ora('building for ' + process.env.NODE_ENV + '...')
// 测试构建开始的值
spinner.start()
// console.log(path)
// 清除某一路径下的文件
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  // 清除文件
  // 引入webpack的配置文件
  // 使用webpack相关配置去执行任务
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')
    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
