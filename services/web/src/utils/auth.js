import { clientId, clientSecret } from '@/config/app.config'
import api from '@/api/api'
import storage from './storage'

const ACCESS_TOKEN_KEY = 'access_token'
const REFRESH_TOKEN_KEY = 'refresh_token'

const CLIENT_AND_SCOPE_CREDS = Object.freeze({
  scope: '*',
  client_id: clientId,
  client_secret: clientSecret
})

const parseJwt = (token) => {
  var base64Url = token.split('.')[1]
  var base64 = base64Url.replace('-', '+').replace('_', '/')
  return JSON.parse(window.atob(base64))
}

const accessTokenExpired = (token) => {
  if (!token) {
    return true
  }
  const parsed = parseJwt(token)
  var currentTime = Date.now() / 1000
  return parsed.exp < currentTime
}

const updateTokens = (accessToken, refreshToken) => {
  storage.set(ACCESS_TOKEN_KEY, accessToken)
  storage.set(REFRESH_TOKEN_KEY, refreshToken)
  return accessToken
}

const exchangeRefreshToAccessToken = (refreshToken) => {
  const data = Object.assign({}, {
    refresh_token: refreshToken,
    grant_type: 'refresh_token'
  }, CLIENT_AND_SCOPE_CREDS)

  return api.post('/auth/token', { data })
}

const setAuthorizationHeaders = (args = [], accessToken) => {
  const authorizationHeaders = { Authorization: `Bearer ${accessToken}` }
  if (args.length > 1) {
    const config = args[1]
    args[1] = {
      ...config,
      headers: Object.assign({}, config.headers, authorizationHeaders)
    }
  } else {
    args[1] = { headers: authorizationHeaders }
  }
  return args
}

export const login = (username, password) => {
  const data = Object.assign({}, { username, password }, {
    grant_type: 'password',
    client_id: clientId,
    client_secret: clientSecret
  })

  return api.post('/auth/token', { data })
    .then(({
      [ACCESS_TOKEN_KEY]: accessToken,
      [REFRESH_TOKEN_KEY]: refreshToken
    }) => updateTokens(accessToken, refreshToken))
}

export const auth = (target, key, descriptor) => {
  if (typeof descriptor.value === 'function') {
    const originalFn = descriptor.value
    descriptor.value = function (...args) {
      let accessToken = storage.get(ACCESS_TOKEN_KEY)
      let tokenResponse = null
      if (accessTokenExpired(accessToken)) {
        const refreshToken = storage.get(REFRESH_TOKEN_KEY)
        tokenResponse = exchangeRefreshToAccessToken(refreshToken)
          .then(({
            [ACCESS_TOKEN_KEY]: accessToken,
            [REFRESH_TOKEN_KEY]: refreshToken
          }) => updateTokens(accessToken, refreshToken))
      } else {
        tokenResponse = Promise.resolve()
          .then(() => accessToken)
      }
      return tokenResponse
        .then((accessToken) => setAuthorizationHeaders(args, accessToken))
        .then((args) => originalFn.apply(null, args))
    }
  }
  return descriptor
}

export const loggedIn = () => {
  const accessToken = storage.get(ACCESS_TOKEN_KEY)
  if (!accessTokenExpired(accessToken)) {
    return true
  }
  const refreshToken = storage.get(REFRESH_TOKEN_KEY)
  return !!refreshToken
}
