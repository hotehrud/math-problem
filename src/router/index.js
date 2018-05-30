import Vue from 'vue'
import Router from 'vue-router'
import home from '@/views/home'
import Board from '@/components/Board'
import Problem from '@/views/Problem'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/problem',
      component: Problem,
    },
    {
      path: '/problem/:id',
      name: 'problem',
      component: Board
    },
    {
      path: '/play',
      name: 'Board',
      component: Board
    }
  ],
  mode: 'history'
})
