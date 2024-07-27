// 首页 (路由的拦截、以及 TagsNav 不关闭的路由 name 。)
export const HOME_NAME = 'HomeIndex'
// 登录页 (路由的拦截)
export const LOGIN_NAME = 'Login'

// iconfont 的在线地址 src/components/icon/IconFont.jsx
export const scriptUrl = ''

// 页面内使用的环境变量
const APP_ENV = import.meta.env['VITE_VUE_APP_ENV'] || 'production'
export const isDev = APP_ENV === 'development'
export const isProd = APP_ENV === 'production'
