import Vue from 'vue'
import Router from 'vue-router'
import home from '@/views/home'
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
      name: 'main',
      path: '/problem',
      component: Problem,
    },
    {
      path: '/problem/:id',
      name: 'problem',
      component: Problem
    }
  ],
  mode: 'history'
})
