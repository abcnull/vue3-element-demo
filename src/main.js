/**
 * Vue 应用入口文件
 * 
 * 此文件是整个应用的启动点，负责：
 * 1. 创建 Vue 应用实例
 * 2. 注册全局插件（ElementPlus UI 库、Vue Router 路由）
 * 3. 引入 ElementPlus 的 CSS 样式
 * 4. 引入 Mock 数据模块（拦截 HTTP 请求用于开发测试）
 * 5. 挂载应用到 DOM 的 #app 元素
 */
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import './mock/student'

// 创建 Vue 应用实例，传入根组件 App.vue
const app = createApp(App)

// 全局注册 ElementPlus UI 组件库
// 注册后可以在任何组件中直接使用 el-button、el-table 等组件
app.use(ElementPlus)

// 全局注册 Vue Router 路由管理器
// 注册后可以使用 router-view、router-link 等组件，以及 useRouter、useRoute 等 API
app.use(router)

// 将应用挂载到 index.html 中 id 为 'app' 的 DOM 元素上
app.mount('#app')
