import localStorage from './local-storage'

const AUTH_TOKEN_KEY = 'auth_token'

export default {
  loggedIn () {
    return !!localStorage.get(AUTH_TOKEN_KEY)
  },
  login (username, password) {
    return Promise.resolve()
      .then(() => localStorage.set(AUTH_TOKEN_KEY, 'foo'))
  }
}
