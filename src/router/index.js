import Vue from 'vue'
import Router from 'vue-router'
import Pos from '@/components/page/Pos'
import Shop from '@/components/page/Shop'
import Member from '@/components/page/Member'
import Count from '@/components/page/Count'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: Pos
    },
    {
      path: '/page/Pos',
      name: 'Pos',
      component: Pos
    }, {
      path: '/page/Shop',
      name: 'Shop',
      component: Shop
    }, {
      path: '/page/Member',
      component: Member
    }, {
      path: '/page/Count',
      component: Count
    }
  ]
})
