/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 *
 */

let baseUrl = 'http://101.37.27.156:7081';
let routerMode = 'hash';

if(location.hostname == 'localhost'){//本地开发
  baseUrl = 'http://101.37.27.156:7081';
}else if(location.hostname == 'jpwx.cd121.com'){//生产环境
  baseUrl = 'jpapi.cd121.com:7082';
  routerMode = 'history'
}else if(location.hostname == 'wxtest.cd121.com'){//测试环境
  baseUrl = 'http://101.37.27.156:7081';
  routerMode = 'history'
}else{
  baseUrl = 'http://101.37.27.156:7081';
  routerMode = 'history'
}
// if (process.env.NODE_ENV == 'development') {
//     baseUrl = 'http://101.37.27.156:7081';
//     // routerMode = 'history';
// }else if(process.env.NODE_ENV == 'production'){
//   baseUrl = 'http://101.37.27.156:7081';
//   routerMode = 'history'
// }

export default {
	baseUrl:baseUrl,
  routerMode:routerMode,
}


