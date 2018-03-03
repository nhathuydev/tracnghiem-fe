import {STATUS_CODE, url} from '@/constants'
import store from '../store'
import {USER_RESET} from '@/store/mutation-types'

export const convert = () => {

}
export function errorApiHandler (error) {
  const {status, data} = error
  let title = 'Error'
  let content = []
  switch (status) {
    case STATUS_CODE.HTTP_UNPROCESSABLE_ENTITY: {
      Object.keys(data).forEach(k => {
        content.push(data[k])
      })
      break
    }
    case STATUS_CODE.HTTP_UNAUTHORIZED: {
      content.push('Invalid credential')
      // global.vm.$router.push({'name': 'Login'})
      break
    }
    case 400: {
      content.push('Error occur!!!')
      break
    }
    case 404: {
      content.push('Opp! Not found')
      store.commit(USER_RESET)
      break
    }
    case 405: {
      content.push('Pls login!!!')
      // store.commit(USER_RESET)
      // global.vm.$router.push({'name': 'Login'})
      break
    }
    default: null
  }
  if (title && content.length > 0) {
    showNotification({title, content}, 'error')
  }
}
export function successApiHandler (data) {
  showNotification({title: 'Success!!!', content: [data]})
}

export function showNotification ({title = 'Notification', content = []}, type = 'success') {
  let text = ''
  content.forEach(item => {
    text += item + '<br/>'
  })
  if (!text) return
  global.vm.$notify({
    group: 'notification',
    title,
    text,
    type
  })
}
export function getImageById (id) {
  return `${url}image${id}.jpg`
}
