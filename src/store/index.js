import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import * as actions from './actions'
import * as getters from './getters'
import user from './modules/user'
import collection from './modules/collection'
import question from './modules/question'
import tag from './modules/tag'
import answer from './modules/answer'
import account from './modules/account'
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
const store = new Vuex.Store({
  actions,
  getters,
  plugins: [createPersistedState()],
  modules: {
    user,
    collection,
    question,
    tag,
    answer,
    account
  },
  strict: debug
})
export default store
