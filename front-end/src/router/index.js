import Vue from 'vue'
import Router from 'vue-router'
import App from '@/App'
import Host from '@/components/Host'
import LandingPage from '@/components/LandingPage'

Vue.use(Router)

export default new Router ({
  routes: [
    {
      path: '/',
      name: 'root',
      component: LandingPage
    },
    {
      path: '/host',
      name: 'host',
      component: Host
    }
  ]
})
