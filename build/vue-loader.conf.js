'use strict'
const utils = require('./utils')
const config = require('../config')
const isBuild = process.env.OPT === 'build'

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: isBuild
      ? config.build.productionSourceMap
      : config.start.cssSourceMap,
    extract: isBuild
  }),
  transformToRequire: {
    video: 'src',
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}
