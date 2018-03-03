import { getAnswer } from '@/api'
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
  answers: state => state.data
}

// actions
const actions = {
  getAnswer ({ commit, state }, payload = {}) {
    return new Promise((resolve, reject) => {
      if (!payload.page) {
        payload.page = parseInt(state.data.current_page, 10)
      }
      payload.size = parseInt(state.data.per_page, 10)
      getAnswer(payload)
        .then(result => {
          commit(types.ANSWER_UPDATE, result.data)
          resolve(result)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  updateSizeAnswer ({ commit, dispatch }, size) {
    commit(types.ANSWER_UPDATE_SIZE, size)
    dispatch('getAnswer')
  },
  updatePageAnswer ({ commit, dispatch }, page) {
    commit(types.ANSWER_UPDATE_PAGE, page)
    dispatch('getAnswer')
  }
}
// mutation
const mutations = {
  [types.ANSWER_UPDATE] (state, payload) {
    state.data = payload
  },
  [types.ANSWER_UPDATE_SIZE] (state, size) {
    state.data.per_page = size
  },
  [types.ANSWER_UPDATE_PAGE] (state, page) {
    state.data.current_page = page
  },
  [types.ANSWER_REMOVE_ITEMS] (state, ids) {
    let datanew
    ids.map(cur => {
      datanew = state.data.data.filter(item => item.id !== cur)
    })
    state.data.data = datanew
  }
}
export default {
  state, getters, actions, mutations
}
