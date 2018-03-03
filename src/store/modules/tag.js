import { getTag } from '@/api'
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
  tags: state => state.data
}

// actions
const actions = {
  getTag ({ commit, state }, payload = {}) {
    return new Promise((resolve, reject) => {
      if (!payload.page) {
        payload.page = parseInt(state.data.current_page, 10)
      }
      payload.size = parseInt(state.data.per_page, 10)
      getTag(payload)
        .then(result => {
          commit(types.TAG_UPDATE, result.data)
          resolve(result)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  deleteTag ({ commit }, payload = []) {
    let data
    if (typeof payload === 'number') {
      data = [payload]
    }
    return data
    // deleteTag(data)
    //   .then(() => commit(types.TAG_REMOVE_ITEMS, data))
    //   .catch(error => console.log(error))
  },
  updateSizeTag ({ commit, dispatch }, size) {
    commit(types.TAG_UPDATE_SIZE, size)
    dispatch('getTag')
  },
  updatePageTag ({ commit, dispatch }, page) {
    commit(types.TAG_UPDATE_PAGE, page)
    dispatch('getTag')
  }
}
// mutation
const mutations = {
  [types.TAG_UPDATE] (state, payload) {
    state.data = payload
  },
  [types.TAG_UPDATE_SIZE] (state, size) {
    state.data.per_page = size
  },
  [types.TAG_UPDATE_PAGE] (state, page) {
    state.data.current_page = page
  },
  [types.TAG_REMOVE_ITEMS] (state, ids) {
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
