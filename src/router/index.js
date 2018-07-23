import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import maps from './../components/maps.vue'
import add from './../components/pages/add.vue'
import login from './../components/pages/login.vue';
import support from './../components/pages/support.vue';
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path:'/map',
      name:"Maps",
      component:maps
    },
    {
      path:"/add",
      name: "Add",
      component:add
    },
    {
      path:"/login",
      component:login
    },
    {
      path:"/support",
      component:support
    }

  ]
})
