import { getAccount } from '@/api'
import * as types from './../mutation-types'

// init state
const state = {
  data: {
    per_page: 20,
    data: [],
    current_page: -1
  }
}

// getters
const getters = {
  accounts: state => state.data
}

// actions
const actions = {
  getAccount ({ commit, state }, payload = {}) {
    return new Promise((resolve, reject) => {
      if (!payload.page) {
        payload.page = parseInt(state.data.current_page, 10)
      }
      payload.size = parseInt(state.data.per_page, 10)
      getAccount(payload)
        .then(result => {
          commit(types.ACCOUNT_UPDATE, result.data)
          resolve(result)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  updateSizeAccount ({ commit, dispatch }, size) {
    commit(types.ACCOUNT_UPDATE_SIZE, size)
    dispatch('getAccount')
  },
  updatePageAccount ({ commit, dispatch }, page) {
    commit(types.ACCOUNT_UPDATE_PAGE, page)
    dispatch('getAccount')
  }
}
// mutation
const mutations = {
  [types.ACCOUNT_UPDATE] (state, payload) {
    state.data = payload
  },
  [types.ACCOUNT_UPDATE_SIZE] (state, size) {
    state.data.per_page = size
  },
  [types.ACCOUNT_UPDATE_PAGE] (state, page) {
    state.data.current_page = page
  }
}
export default {
  state, getters, actions, mutations
}
