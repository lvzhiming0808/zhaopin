export default {
  setItem(key, value) {
    window.sessionStorage.setItem(key, value)
  },
  getItem(key) {
    return window.sessionStorage.getItem(key)
  },
  removeItem(key) {
    window.sessionStorage.removeItem(key)
  },
  clear() {
    window.sessionStorage.clear()
  }
}
