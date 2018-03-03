import {login, detailUser} from '@/api'
import * as types from './../mutation-types'
import {showNotification} from '@/helpers'

// init state
const state = {
//  info: JSON.parse(window.localStorage.getItem('user'))
  info: null
}

// getters
const getters = {
  isLogged: state => state.info !== null,
  token: state => state.info && state.info.token,
  info: state => state.info
}

// actions
const actions = {
  login ({ commit, dispatch }, {email, password}) {
    return new Promise((resolve, reject) => {
      login(email, password)
        .then(result => {
          if (result.data.error === 'invalid_credentials') {
            showNotification({content: [result.data.message]}, 'error')
            reject()
          } else {
            commit(types.USER_UPDATE, result.data)
            global.vm.$router.push({'name': 'Dashboard'})
            resolve(result)
          }
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  updateUser ({ commit }) {
    return new Promise((resolve, reject) => {
      detailUser()
        .then(data => {
          commit(types.USER_UPDATE, data.data)
        })
        .catch(error => {
          console.log(error)
        })
    })
  },
  logout ({ commit }) {
    commit(types.USER_RESET)
  }
}
// mutation
const mutations = {
  [types.USER_UPDATE] (state, payload) {
    state.info = {...state.info, ...payload}
  },
  [types.USER_RESET] (state) {
    state.info = null
  }
}
export default {
  state, getters, actions, mutations
}
