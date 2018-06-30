import { loggedIn, login } from '@/utils/auth'

export const AUTH_TOKEN_KEY = 'auth_token'

export const AUTH_LOGIN_ACTION = 'auth/login'
export const AUTH_LOGEDIN = 'auth/loggedIn'

const AUTH_LOGIN_SUCCESS = 'auth/loginSuccess'

export const state = {
  [AUTH_LOGEDIN]: loggedIn()
}

export const mutations = {
  [AUTH_LOGIN_SUCCESS]: (state) => {
    state[AUTH_LOGEDIN] = true
  }
}

export const actions = {
  [AUTH_LOGIN_ACTION]: ({ commit }, { payload }) => {
    return login(payload.username, payload.password)
      .then(() => commit(AUTH_LOGIN_SUCCESS))
  }
}

export default {
  state,
  mutations,
  actions
}
