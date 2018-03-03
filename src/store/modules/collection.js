import { getCollection, deleteCollection, publishCollection } from '@/api'
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
  collections: state => state.data
}

// actions
const actions = {
  getCollection ({ commit, state }, payload = {}) {
    return new Promise((resolve, reject) => {
      if (!payload.page) {
        payload.page = parseInt(state.data.current_page, 10)
      }
      payload.size = parseInt(state.data.per_page, 10)
      getCollection(payload)
        .then(result => {
          commit(types.COLLECTION_UPDATE, result.data)
          resolve(result)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  deleteCollection ({ commit }, payload = []) {
    let data
    if (typeof payload === 'number') {
      data = [payload]
    }
    deleteCollection(data)
      .then(() => commit(types.COLLECTION_REMOVE_ITEMS, data))
      .catch(error => console.log(error))
  },
  updateSizeCollection ({ commit, dispatch }, size) {
    commit(types.COLLECTION_UPDATE_SIZE, size)
    dispatch('getCollection')
  },
  updatePageCollection ({ commit, dispatch }, page) {
    commit(types.COLLECTION_UPDATE_PAGE, page)
    dispatch('getCollection')
  },
  publishCollection ({ commit }, payload) {
    publishCollection(payload)
      .then(() => {
        commit(types.COLLECTION_UPDATE_STATUS_ITEM, payload)
      })
      .catch(error => {
        console.log(error)
      })
  }
}
// mutation
const mutations = {
  [types.COLLECTION_UPDATE] (state, payload) {
    state.data = payload
  },
  [types.COLLECTION_UPDATE_SIZE] (state, size) {
    state.data.per_page = size
  },
  [types.COLLECTION_UPDATE_PAGE] (state, page) {
    state.data.current_page = page
  },
  [types.COLLECTION_REMOVE_ITEMS] (state, ids) {
    let datanew
    ids.map(cur => {
      datanew = state.data.data.filter(item => item.id !== cur)
    })
    state.data.data = datanew
  },
  [types.COLLECTION_UPDATE_STATUS_ITEM] (state, payload) {
    state.data.data[state.data.data.findIndex(item => item.id === payload.ids[0])].isPublish = payload.publish
  }
}
export default {
  state, getters, actions, mutations
}
