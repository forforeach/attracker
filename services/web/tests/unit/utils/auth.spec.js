import jwt from 'jsonwebtoken'
import { auth } from '../../../src/utils/auth'
import storage from '../../../src/utils/storage'
import api from '../../../src/api/api'

jest.mock('../../../src/utils/storage', () => {
  let storageMock = {}
  return {
    get (key) {
      return storageMock[key]
    },
    set (key, value) {
      storageMock[key] = value
    },
    getStorage () {
      return storageMock
    },
    resetStorage () {
      storageMock = {}
    }
  }
})

jest.mock('../../../src/api/api', () => ({
  post: jest.fn(() => Promise.resolve({
    access_token: 'access_token',
    refresh_token: 'refresh_token'
  }))
}))

describe('Auth utils:', () => {
  describe('@auth decorator ', () => {
    const descriptorMock = { value: jest.fn((url, config) => Promise.resolve(config)) }

    let descriptor = null

    beforeEach(() => {
      descriptorMock.value.mockClear()
      descriptor = Object.assign({}, descriptorMock)
      storage.resetStorage()
      api.post.mockClear()
    })

    it('calls original function', (done) => {
      let augmentedDescriptor = auth(null, null, descriptor)
      augmentedDescriptor.value('url').then((config) => {
        expect(descriptorMock.value.mock.calls.length).toBe(1)
        done()
      })
    })

    it('obtains access_token by refresh_token', (done) => {
      let augmentedDescriptor = auth(null, null, descriptor)
      augmentedDescriptor.value('url').then((config) => {
        expect(api.post.mock.calls.length).toBe(1)
        expect(storage.getStorage().access_token).toBe('access_token')
        expect(storage.getStorage().refresh_token).toBe('refresh_token')
        done()
      })
    })

    it('sends refresh_token from storage to api', (done) => {
      let augmentedDescriptor = auth(null, null, descriptor)
      const token = 'some_refresh_token'
      storage.set('refresh_token', token)
      augmentedDescriptor.value('url').then((config) => {
        const apiCalls = api.post.mock.calls
        expect(apiCalls.length).toBe(1)
        expect(apiCalls[0][1].data.refresh_token).toBe(token)
        done()
      })
    })

    it('obtains refresh_token while access_token is expired', (done) => {
      const token = jwt.sign({ data: 'foobar', exp: Math.floor(Date.now() / 1000) - 30 }, 'secret')
      storage.set('access_token', token)
      let augmentedDescriptor = auth(null, null, descriptor)
      augmentedDescriptor.value('url').then((config) => {
        expect(api.post.mock.calls.length).toBe(1)
        expect(config.headers).toBeDefined()
        expect(config.headers.Authorization).toBe(`Bearer access_token`)
        done()
      })
    })

    it('sets Authorization headers to augmented request', (done) => {
      let augmentedDescriptor = auth(null, null, descriptor)
      augmentedDescriptor.value('url').then((config) => {
        expect(config.headers).toBeDefined()
        expect(config.headers.Authorization).toBe('Bearer access_token')
        done()
      })
    })

    it('uses existing access token', (done) => {
      const token = jwt.sign({ data: 'foobar', iat: Math.floor(Date.now() / 1000) + 1000 }, 'secret')
      storage.set('access_token', token)
      let augmentedDescriptor = auth(null, null, descriptor)
      augmentedDescriptor.value('url').then((config) => {
        expect(api.post.mock.calls.length).toBe(0)
        expect(config.headers).toBeDefined()
        expect(config.headers.Authorization).toBe(`Bearer ${token}`)
        done()
      })
    })
  })
})
