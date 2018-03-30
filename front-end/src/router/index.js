import Vue from 'vue'
import Router from 'vue-router'
import App from '@/App'
import Host from '@/Host'
import Guest from '@/Guest'
import LandingPage from '@/LandingPage'

Vue.use(Router)

export default new Router ({
  routes: [
    {
      path: '/',
      name: 'root',
      component: LandingPage
    },
    {
      path: '/host/:partyId',
      name: 'host',
      component: Host
    },
    {
      path: '/guest/:partyId/:guestId',
      name: 'guest',
      component: Guest
    }
  ]
})
