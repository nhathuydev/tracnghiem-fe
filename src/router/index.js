import Vue from 'vue'
import store from '@/store'
import Router from 'vue-router'
import {LayoutMain, LayoutAuth} from '@/pages/layout'
import Login from '@/pages/auth/Login'
import Lockscreen from '@/pages/auth/Lockscreen'
import Dashboard from '@/pages/Dashboard'
import Profile from '@/pages/Profile'
import Toolkit from '@/pages/Toolkit'
import Notfound from '@/pages/Notfound'
import { AddCollection, ListCollection, EditCollection, DetailCollection } from '@/pages/collection'
import { AddQuestion, ListQuestion, EditQuestion, DetailQuestion } from '@/pages/question'
import { AddTag, ListTag, EditTag, DetailTag } from '@/pages/tag'
import { AddAnswer, ListAnswer, EditAnswer, DetailAnswer } from '@/pages/answer'
import { ListUser } from '@/pages/user'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  saveScrollPosition: true,
  base: '/',
  linkActiveClass: 'open',
  routes: [
    {
      path: '/auth',
      name: 'Auth',
      component: LayoutAuth,
      children: [
        {
          path: 'login',
          name: 'Login',
          component: Login
        },
        {
          path: 'register',
          name: 'Register',
          component: Login
        },
        {
          path: 'lock',
          name: 'LockScreen',
          component: Lockscreen
        }
      ]
    },
    {
      path: '/',
      component: LayoutMain,
      meta: { Auth: true },
      children: [
        {
          path: '',
          name: 'Dashboard',
          component: Dashboard,
          meta: {
            Auth: true
          }
        },
        {
          path: '/profile',
          name: 'Profile',
          component: Profile,
          meta: {
            Auth: true
          }
        },
        {
          path: '/toolkit',
          name: 'Toolkit',
          component: Toolkit,
          meta: {
            Auth: true
          }
        },
        {
          path: '/collection',
          name: 'CollectionList',
          component: ListCollection,
          meta: {
            Auth: true
          }
        },
        {
          path: '/collection/add',
          name: 'CollectionAdd',
          component: AddCollection,
          meta: {
            Auth: true
          }
        },
        {
          path: '/collection/:id',
          name: 'CollectionDetail',
          component: DetailCollection,
          meta: {
            Auth: true
          }
        },
        {
          path: '/collection-edit/:id',
          name: 'CollectionEdit',
          component: EditCollection,
          meta: {
            Auth: true
          }
        },

        {
          path: '/question',
          name: 'QuestionList',
          component: ListQuestion,
          meta: {
            Auth: true
          }
        },
        {
          path: '/question/add',
          name: 'QuestionAdd',
          component: AddQuestion,
          meta: {
            Auth: true
          }
        },
        {
          path: '/question/:id',
          name: 'QuestionDetail',
          component: DetailQuestion,
          meta: {
            Auth: true
          }
        },
        {
          path: '/question-edit/:id',
          name: 'QuestionEdit',
          component: EditQuestion,
          meta: {
            Auth: true
          }
        },
        {
          path: '/tag',
          name: 'TagList',
          component: ListTag,
          meta: {
            Auth: true
          }
        },
        {
          path: '/tag/add',
          name: 'TagAdd',
          component: AddTag,
          meta: {
            Auth: true
          }
        },
        {
          path: '/tag-edit/:id',
          name: 'TagEdit',
          component: EditTag,
          meta: {
            Auth: true
          }
        },
        {
          path: '/tag/:id',
          name: 'TagDetail',
          component: DetailTag,
          meta: {
            Auth: true
          }
        },
        {
          path: '/answer',
          name: 'AnswerList',
          component: ListAnswer,
          meta: {
            Auth: true
          }
        },
        {
          path: '/answer/add',
          name: 'AnswerAdd',
          component: AddAnswer,
          meta: {
            Auth: true
          }
        },
        {
          path: '/answer/:id',
          name: 'AnswerDetail',
          component: DetailAnswer,
          meta: {
            Auth: true
          }
        },
        {
          path: '/answer-edit/:id',
          name: 'AnswerEdit',
          component: EditAnswer,
          meta: {
            Auth: true
          }
        },
        {
          path: '/user',
          name: 'UserList',
          component: ListUser,
          meta: {
            Auth: true
          }
        }
      ]
    },
    {
      path: '*',
      name: 'Notfound',
      component: Notfound,
      meta: {
        title: 'Error not found!!!'
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.Auth && !store.getters.isLogged) {
    next({
      name: 'Login'
    })
  } else {
    next()
  }
})
export default router
