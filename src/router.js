import Vue from 'vue'
import Router from 'vue-router'

import Index from './views/Index'
import Channel from './views/Channel'
import Article from './views/Article'
import User from './views/User/User'
import Collected from './views/User/Collected'
import Following from './views/User/Following'
import Follower from './views/User/Follower'
import Login from './views/Login'
import Setting from './views/Setting/Setting'
import Base from './views/Setting/Base'
import Avatar from './views/Setting/Avatar'
import Password from './views/Setting/Password'

Vue.use(Router)



const router = new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path:'/',
      component:Index,
      redirect:'/channel/1',
      children:[
        {
          path:'channel/:id',
          component:Channel,
        },
        {
          path:'article/:id',
          component:Article
        },
        {
          path:'setting',
          component:Setting,
          redirect:'setting/base',
          meta:{
            auth:true
          },
          children:[
            {
              path:'base',
              component:Base
            },
            {
              path:'avatar',
              component:Avatar
            },
            {
              path:'password',
              component:Password
            }
          ]
        }
      ]
    },
    {
      path:'/user',
      component:User,
      meta:{
        auth:true
      },
      // redirect:'/user/collected',
      children:[
        {
          path:'collected',
          component:Collected
          // alias:'/user'
        },
        {
          path:'following',
          component:Following
        },
        {
          path:'follower',
          component:Follower
        }
      ]
    },
    {
      path:'/login',
      component:Login,
      beforeEnter(to,from,next){
        // console.log(from.path);
        to.query.returnURL = from.path;
        next();
      }
    }
  ]
})

// 设置 导航守卫
router.beforeEach((to,from,next)=>{
  const login = localStorage.getItem('username');
  if(to.matched.some(route => route.meta.auth)){
    if(localStorage.getItem('token')){
      next();
    }else{
      next('/login?returnURL='+to.path);
    }
  }else{
    next()
  }
})

export default router
