import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home.page.vue'
import Login from '@/pages/login.page.vue'

import { loggedIn } from '@/utils/auth'

Vue.use(Router)

const publicRoutes = { 'login': true, 'signup': true }

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      props: (route) => ({ redirect: route.query.redirect }),
      component: Login
    }
  ]
})

// authentication route guard
router.beforeEach((to, from, next) => {
  let nextParams
  if (!loggedIn() && !(to.name in publicRoutes)) {
    nextParams = {
      name: 'login',
      query: { redirect: to.fullPath }
    }
  } else if (loggedIn() && to.name in publicRoutes) {
    nextParams = { name: 'home' }
  }
  next(nextParams)
})

export default router
