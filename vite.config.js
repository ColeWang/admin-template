import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

import { defineConfig, isCSSRequest, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { reduce } from 'lodash-es'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const vendors = reduce({
    'vue-vendor': ['vue', 'vue-router', 'pinia'],
    'antd-vendor': ['ant-design-vue', '@ant-design/icons-vue'],
    'utils-vendor': ['dayjs', 'lodash-es'],
    'common-vendor': ['axios', 'vue-i18n', 'js-cookie', 'nprogress']
}, (result, modules, key) => {
    const needVendors = modules.map((name) => {
        return { name: name, vendor: key }
    })
    return [...result, ...needVendors]
}, [])

function manualChunks (id) {
    if (id.includes('/node_modules/') && !isCSSRequest(id)) {
        const result = vendors.find((item) => {
            return id.includes(`/node_modules/${item.name}/`)
        })
        return result ? result.vendor : undefined
    }
    return undefined
}

export default defineConfig((config) => {
    const env = loadEnv(config.mode, __dirname, ['VITE_', 'ENV_'])

    const APP_ENV = env['VITE_VUE_APP_ENV'] || 'production'
    const isProd = APP_ENV === 'production'

    return {
        base: './',
        plugins: [
            vue(),
            vueJsx()
        ],
        build: {
            rollupOptions: {
                output: {
                    manualChunks: manualChunks
                }
            }
        },
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@import \'@/css/mixin.scss\';@import \'@/css/theme.scss\';'
                }
            }
        },
        resolve: {
            alias: {
                '@': resolve(__dirname, 'src'),
                '@packages': resolve(__dirname, 'packages'),
                '@utils': resolve(__dirname, 'packages/_utils')
            }
        }
    }
})
