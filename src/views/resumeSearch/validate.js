export function isvalidUsername(str) {
	// need update
	// 前端模拟用目前为写死的
  return true
}

/* 合法uri*/
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}

/* 小写字母*/
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母*/
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母*/
export function validatAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}
export const checkSelectData = data => {
  return true
}
export const checkAgeMax = (rule, value, callback) => {
  if (!/^[0-9]+$/.test(value) && value !== '') {
    callback(new Error('请输入正整数'))
  }
  if (value < 18 && value !== '') {
    callback(new Error('必须年满18岁'))
  }
  if (this.searchobj.ageMin) {
    if (value * 1 < this.searchobj.ageMin * 1) {
      callback(new Error('必须大于起始值'))
    }
  }
  if (value > 100) {
    this.searchobj.ageMax = 100
  } else {
    callback()
  }
}
export const ValworkLengthMin = (rule, value, callback) => {
  if (!/^[0-9]+$/.test(value) && value !== '') {
    // this.searchobj.workLengthMin = 0
    callback(new Error('请输入正整数'))
  }
  if (value > 100) {
    this.searchobj.workLengthMin = 100
  }
  if (this.searchobj.workLengthMax) {
    if (this.searchobj.workLengthMin * 1 > this.searchobj.workLengthMax * 1) {
      callback(new Error('必须小于最大值'))
    } else {
      callback()
    }
  } else {
    callback()
  }
}
export const ValworkLengthMax = (rule, value, callback) => {
  if (!/^[0-9]+$/.test(value) && value !== '') {
    // this.searchobj.workLengthMax = 0
    callback(new Error('请输入正整数'))
  }
  if (this.searchobj.workLengthMax * 1 < this.searchobj.workLengthMin * 1) {
    callback(new Error('必须大于起始值'))
  }
  if (value > 100) {
    this.searchobj.workLengthMax = 100
  }
  if (this.searchobj.workLengthMin) {
    if (this.searchobj.workLengthMin * 1 > this.searchobj.workLengthMax * 1) {
      callback(new Error('必须大于起始值'))
    } else {
      callback()
    }
  } else {
    callback()
  }
}
export const ValsalaryMin = (rule, value, callback) => {
  if (!/^[0-9]+$/.test(value) && value !== '') {
    callback(new Error('请输入正整数'))
  } else if (!/^\d{0,8}$/.test(value)) {
    callback(new Error('请输入小于8位的数值'))
  }
  if (this.searchobj.salaryMax) {
    if (this.searchobj.salaryMin * 1 > this.searchobj.salaryMax * 1) {
      callback(new Error('必须小于最大值'))
    } else {
      callback()
    }
  } else {
    callback()
  }
}
export const ValsalaryMax = (rule, value, callback) => {
  if (!/^[0-9]+$/.test(value) && value !== '') {
    callback(new Error('请输入正整数'))
  } else if (!/^\d{0,8}$/.test(value)) {
    callback(new Error('请输入小于8位的数值'))
  }
  if (this.searchobj.salaryMin) {
    if (this.searchobj.salaryMin * 1 > this.searchobj.salaryMax * 1) {
      callback(new Error('必须大于起始值'))
    } else {
      callback()
    }
  } else {
    callback()
  }
}
