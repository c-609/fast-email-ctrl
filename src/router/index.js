import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/login/Login'
import Home  from '@/components/Home'
import test from '@/test/test'
import User from '@/components/pages/right-managing/User'
import Role from '@/components/pages/right-managing/Role'
import Menu from '@/components/pages/right-managing/Menu'
import Dept from '@/components/pages/right-managing/Dept'
import Person from '@/components/pages/index/person/Person'
import Wel from './../components/pages/index/Wel'
Vue.use(Router)

export default new Router({
  routes: [

    {
      path: '/test',
      name: 'test',
      component: test
    },
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      
      children:[
        {
          path:'/upms/user',
          name:'User',
          component:User,
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          },
        },
        {
          path: '/upms/role',
          name: 'Role',
          component: Role,
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          },
        },
        {
          path: '/upms/menu',
          name: 'Menu',
          component: Menu,
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          },
        },
        {
          path: '/upms/dept',
          name: 'Dept',
          component: Dept,
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          },
        },
        {
          path: '/person',
          name: 'person',
          component: Person,
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          },
        },
        {
          path: '/wel',
          name: 'wel',
          component: Wel,
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          },
        },
      ]
    }
  ]
})

 
