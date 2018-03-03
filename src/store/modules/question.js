import { getQuestion, deleteQuestion } from '@/api'
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
  questions: state => state.data
}

// actions
const actions = {
  getQuestion ({ commit, state }, payload = {}) {
    return new Promise((resolve, reject) => {
      if (!payload.page) {
        payload.page = parseInt(state.data.current_page, 10)
      }
      payload.size = parseInt(state.data.per_page, 10)
      getQuestion(payload)
        .then(result => {
          commit(types.QUESTION_UPDATE, result.data)
          resolve(result)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  deleteQuestion ({ commit }, payload = []) {
    let data
    if (typeof payload === 'number') {
      data = [payload]
    }
    deleteQuestion(data)
      .then(() => commit(types.QUESTION_REMOVE_ITEMS, data))
      .catch(error => console.log(error))
  },
  updateSizeQuestion ({ commit, dispatch }, size) {
    commit(types.QUESTION_UPDATE_SIZE, size)
    dispatch('getQuestion')
  },
  updatePageQuestion ({ commit, dispatch }, page) {
    commit(types.QUESTION_UPDATE_PAGE, page)
    dispatch('getQuestion')
  }
}
// mutation
const mutations = {
  [types.QUESTION_UPDATE] (state, payload) {
    state.data = payload
  },
  [types.QUESTION_UPDATE_SIZE] (state, size) {
    state.data.per_page = size
  },
  [types.QUESTION_UPDATE_PAGE] (state, page) {
    state.data.current_page = page
  },
  [types.QUESTION_REMOVE_ITEMS] (state, ids) {
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
