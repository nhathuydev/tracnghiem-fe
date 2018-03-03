import axios from 'axios'
import store from '../store'
import {API, baseUrl, MESSAGE} from '@/constants'
import {errorApiHandler, successApiHandler} from '@/helpers'
const api = axios.create({
  baseURL: baseUrl,
  headers: {
    Accept: 'application/json'
  }
})

const METHOD = {
  POST: 'post',
  GET: 'get',
  PUT: 'put',
  DELTE: 'delete'
}
function fetcher (method, inputEndpoint, body, successString = null) {
  if (inputEndpoint !== API.LOGIN) {
    api.defaults.headers.common['Authorization'] = `Bearer ${store.getters.token}`
  }
  let url = inputEndpoint
  let hasSplash = false
  if (method === METHOD.GET || method === METHOD.DELTE) {
    if (method === METHOD.GET) {
      url += '?'
    }
    for (const p in body) {
      const flag = parseInt(p, 10)
      if (isNaN(flag)) {
        url += `${p}=${body[p]}&`
      } else {
        hasSplash = true
        url += `${body[p]}&`
      }
    }
    url = url.substring(0, url.length - 1)
    if (hasSplash) {
      url = url.replace('?', '')
    }
    console.log(`Request to ${url}`)
  }
  // console.log(body)
  return new Promise((resolve, reject) => {
    return api[method](url, body)
      .then(response => {
        if (successString) {
          successApiHandler(successString)
        }
        resolve(response.data)
      })
      .catch(error => {
        console.log(error.response)
        errorApiHandler(error.response)
        reject(error.response)
      })
  })
}

export function login (email, password) {
  return fetcher(METHOD.POST, API.LOGIN, {email: email, password: password})
}
export function detailUser () {
  return fetcher(METHOD.GET, API.USER)
}

// collection
export function createCollection (payload) {
  return fetcher(METHOD.POST, API.COLLECTION, payload, MESSAGE.CREATE_SUCCESS)
}
export function updateCollection (payload) {
  return fetcher(METHOD.PUT, API.COLLECTION + '/' + payload.id, payload, MESSAGE.UPDATE_SUCCESS)
}
export function getCollection (payload) {
  return fetcher(METHOD.GET, API.COLLECTION, payload)
}
export function deleteCollection (ids) {
  return fetcher(METHOD.DELTE, API.COLLECTION + '/', ids)
}
export function detailCollection (id) {
  return fetcher(METHOD.GET, API.COLLECTION + '/', [id])
}
export function publishCollection (payload) {
  return fetcher(METHOD.POST, API.COLLECTION_PUBLISH, payload)
}
export function createQuestionOfCollection (payload) {
  return fetcher(METHOD.POST, API.COLLECTION_CREATE_QUESTION, payload, MESSAGE.CREATE_SUCCESS)
}

// question
export function createQuestion (payload) {
  return fetcher(METHOD.POST, API.QUESTION, payload, MESSAGE.CREATE_SUCCESS)
}
export function getQuestion (payload) {
  return fetcher(METHOD.GET, API.QUESTION, payload)
}
export function deleteQuestion (ids) {
  return fetcher(METHOD.DELTE, API.QUESTION + '/', ids)
}
export function detailQuestion (id) {
  return fetcher(METHOD.GET, API.QUESTION + '/', [id])
}

// tag
export function createTag (payload) {
  return fetcher(METHOD.POST, API.TAG, payload, MESSAGE.CREATE_SUCCESS)
}
export function updateTag (payload) {
  return fetcher(METHOD.PUT, API.TAG + '/' + payload.id, payload, MESSAGE.UPDATE_SUCCESS)
}
export function getTag (payload) {
  return fetcher(METHOD.GET, API.TAG, payload)
}
export function detailTag (id) {
  return fetcher(METHOD.GET, API.TAG + '/', [id])
}
export function searchTag (payload) {
  return fetcher(METHOD.GET, API.TAG, payload)
}

// account
export function getAccount (payload) {
  return fetcher(METHOD.GET, API.USERS, payload)
}

// category
export function createAnswer (payload) {
  return fetcher(METHOD.POST, API.ANSWER, payload, MESSAGE.CREATE_SUCCESS)
}
export function updateAnswer (payload) {
  return fetcher(METHOD.PUT, API.ANSWER + '/' + payload.id, payload, MESSAGE.UPDATE_SUCCESS)
}
export function getAnswer (payload) {
  return fetcher(METHOD.GET, API.ANSWER, payload)
}
export function searchAnswer (payload) {
  return fetcher(METHOD.GET, API.ANSWER, payload)
}
export function detailAnswer (id) {
  return fetcher(METHOD.GET, API.ANSWER + '/', [id])
}

// dashboard
export function getDashboard () {
  return fetcher(METHOD.GET, API.DASHBOARD)
}
