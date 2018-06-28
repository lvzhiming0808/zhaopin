'use strict'
const chalk = require('chalk')
const util = require('util')

const argsRequirements = [{
  isEnv: true, //是否是环境变量
  name: 'NODE_ENV',
  allows: ['dev', 'prod']
}]

//解析shell传入的--格式自定义参数
module.exports = function () {
  const errorArgs = [];
  const inputArgs = []
  process.argv.forEach(function (val, index, array) {
    util.log("arg[%d] : %s", index, chalk.cyan(val))
    if (val.startsWith('--') && val.split('=').length === 2) {
      const vals = val.split('--')[1].split('=');
      inputArgs.push({
        name: vals[0],
        value: vals[1]
      });
    }
  });

  for (let index = 0; index < argsRequirements.length; index++) {
    const element = argsRequirements[index];
    let existEle = null;
    inputArgs.forEach(ia => { 
      if (ia.name === element.name && element.allows.indexOf(ia.value) > -1) {
        existEle = ia;
        existEle.isEnv = element.isEnv;
        existEle.allows = element.allows;
      }
    });
    if (existEle != null) {
      if (existEle.isEnv) {
        process.env[existEle.name] = existEle.value;
      } else {
        process[existEle.name] = existEle.value;
      }
    } else {
      errorArgs.push(element)
    }
  }

  for (let index = 0; index < errorArgs.length; index++) {
    const element = errorArgs[index];
    console.log(chalk.red('  Build failed with errors: arg error --' + element.name + ', required and allow values: ' + element.allows.join(",") + '\n'))
  }
  if (errorArgs.length > 0) {
    console.log();
    process.exit(1);
  }
}
