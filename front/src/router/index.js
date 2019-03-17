import Vue from 'vue'
import Router from 'vue-router'
import hash from './hash'
import HelloWorld from '@/components/HelloWorld'
import test from '@/pages/ws'
import Register from '@/pages/register'
import Login from '@/pages/Login'
import Chat from '@/pages/Chat'

Vue.use(Router)

console.log(hash.registerHash)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'default',
      redirect: hash.registerHash
    },
    {
      path: '/ws',
      name: 'test',
      component: test
    },
    {
      path: hash.registerHash,
      name: 'register',
      component: Register
    },
    {
      path: hash.loginHash,
      name: 'login',
      component: Login
    },
    {
      path: hash.chatHash,
      name: 'chat',
      component: Chat
    }
  ]
})
