import localStorage from '@/services/local-storage'

export const AUTH_TOKEN_KEY = 'auth_token'

export const AUTH_LOGIN_ACTION = 'auth/login'
export const AUTH_LOGEDIN = 'auth/loggedIn'

const AUTH_LOGIN_SUCCESS = 'auth/loginSuccess'

export const state = {
  [AUTH_LOGEDIN]: localStorage.get(AUTH_TOKEN_KEY)
}

export const mutations = {
  [AUTH_LOGIN_SUCCESS]: (state) => {
    state[AUTH_LOGEDIN] = true
  }
}

export const actions = {
  [AUTH_LOGIN_ACTION]: ({ commit }) => {
    if (localStorage.get(AUTH_TOKEN_KEY)) {
      return Promise.resolve()
        .then(commit(AUTH_LOGIN_SUCCESS))
    }
    return Promise.resolve()
      .then(() => localStorage.set(AUTH_TOKEN_KEY, 'foo'))
      .then(() => commit(AUTH_LOGIN_SUCCESS))
  }
}

export default {
  state,
  mutations,
  actions
}
