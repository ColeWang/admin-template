import axios from 'axios'

// 缓存
let globalProperties = null

const instance = axios.create({
    // baseURL: genBaseUrl(location.href),
    timeout: 5000,
    headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
    },
    validateStatus (status) {
        return status >= 200 && status < 300
    }
})

instance.interceptors.request.use((config) => {
    return config
}, (err) => {
    return Promise.reject(err)
})

instance.interceptors.response.use((res) => {
    return res
}, (err) => {
    return Promise.reject(err)
})

// 这将允许您使用 this.$axios (Vue Options API形式)
export default ({ app }) => {
    app.config.globalProperties.$axios = instance
    // 缓存 可以获取 $router、$i18n 等
    globalProperties = app.config.globalProperties
}

export { instance as request }
