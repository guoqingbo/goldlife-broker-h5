import Vue from 'vue'
import Router from 'vue-router'
import envConfig from '../config/env'
Vue.use(Router);
const routes = [
  {//新房详情
    path: '/newHouseSharePage',
    name: 'newHouseSharePage',
    component: r =>require.ensure([], () => r(require('../page/newHouse/newHouseSharePage')))
  },
  {//新房查看全部
    path: '/newHouseAllDetail',
    name: 'newHouseAllDetail',
    component: r => require.ensure([], () => r(require('../page/newHouse/newHouseAllDetail'))),
  },
  {//地图
    path: '/mapIncrease',
    name: 'mapIncrease',
    component: r=>require.ensure([], () => r(require('../page/newHouse/mapIncrease'))),
  },
  {//放大图片
    path: '/imgIncrease',
    name: 'imgIncrease',
    component: r => require.ensure([], () => r(require('../page/newHouse/imgIncrease'))),
  },
  {//邀请好友
    path: '/recommend',
    name: 'recommend',
    component: r => require.ensure([], () => r(require('../page/recommendFriend/recommend'))),
  },
  {//推荐注册
    path: '/recommendRegist',
    name: 'recommendRegist',
    component: r => require.ensure([], () => r(require('../page/recommendFriend/recommendRegist'))),
  },
  {//注册成功
    path: '/registSuccess',
    name: 'registSuccess',
    component: r => require.ensure([], () => r(require('../page/recommendFriend/registSuccess'))),
  },
  {//用户协议
    path: '/userProtocol',
    name: 'userProtocol',
    component: r => require.ensure([], () => r(require('../page/recommendFriend/userProtocol'))),
  },
];
const router = new Router({
  mode:envConfig.routerMode,
  base: '/h5broker/',
  routes,
});
export default router
