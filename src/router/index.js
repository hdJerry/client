import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    meta : {
        user : true
      },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../auth/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../auth/Register.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    meta : {
      isAuthenticated: true
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Info.vue')
  },
  {
    path: '/profile/edit',
    name: 'edit',
    meta : {
      isAuthenticated: true
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Edit.vue')
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})




router.beforeEach((to, from, next) => {

  if (to.matched.some(record => record.meta.isAuthenticated)) {
    // console.log("okay");

    if (localStorage.getItem('user') == null) {
      next({
        path: '/'
      })
    }else{
      // next({
      //   path: '/profile'
      // })

      next();

    }
  } else if (to.matched.some(record => record.meta.user)) {
    if (localStorage.getItem('user') == null) {
      next()
    } else {
      next({
        name: 'profile'
      })
    }
  }
  else {
    next();
  }


})

export default router
