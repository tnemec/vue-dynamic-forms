import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Survey from '@/views/Survey'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/survey/:page?',
      name: 'Survey',
      component: Survey,
      props: true
    }    
  ]
})
