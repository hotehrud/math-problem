import Vue from 'vue'
import Router from 'vue-router'
import home from '@/views/home'
import Board from '@/components/Board'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/play',
      name: 'Board',
      component: Board
    }
  ]
})
