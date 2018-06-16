import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import auth from './services/auth'

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
  if (!auth.loggedIn() && !(to.name in publicRoutes)) {
    next({
      name: 'login',
      query: { redirect: to.fullPath }
    })
  } else if (auth.loggedIn() && to.name in publicRoutes) {
    next({ name: 'home' })
  } else {
    next()
  }
})

export default router
