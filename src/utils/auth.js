import Storage from './storage'
import Cookie from 'js-cookie'

const authKey = 'Authorization'
const typeKey = 'token_type'
const nameKey = 'userName'
const ridKey = 'roleId'
const usernameKey = 'usernameEmail'
const loginCountkey = 'loginCount'
const userId = 'userId'

export const getAuth = () => {
  return Storage.getItem(authKey)
}

export const getAuthKey = () => {
  return Storage.getItem(typeKey)
}
export const updatePermission = () => {
  return Storage.getItem(ridKey)
}
export const getusernameKey = () => {
  return Storage.getItem(usernameKey)
}
export const getloginCountkey = () => {
  return Storage.getItem(loginCountkey)
}

export const setAuth = (auth, type, userName, roleId, userEmail, loginCount) => {
  Storage.setItem(nameKey, userName)
  Storage.setItem(authKey, auth)
  Storage.setItem(typeKey, type)
  Storage.setItem(ridKey, roleId)
  Storage.setItem(usernameKey, userEmail)
  Storage.setItem(loginCountkey, loginCount)
  Storage.setItem(userId, userId)
}

export const removeAuth = () => {
  Storage.removeItem(authKey)
  Storage.removeItem(typeKey)
  Storage.removeItem(nameKey)
  Storage.removeItem(ridKey)
  Storage.removeItem(usernameKey)
  Storage.removeItem(loginCountkey)
}

export const refreshAuth = newAuth => {
  removeAuth()
  setAuth(newAuth)
}

export const getAuthFromCookie = () => {
  return Cookie.get(authKey)
}

export const carryAuthToSessionStorage = () => {
	// remove the cookie before move it to sessionStorage
  const Authorization = getAuthFromCookie()
  Cookie.remove(authKey)
  setAuth(Authorization)
}
