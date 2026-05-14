/**
 * Vite 构建工具配置文件
 * Vite 是新一代前端构建工具，相比 webpack 具有以下优势：
 * - 基于浏览器原生 ESM，开发环境启动速度极快
 * - 内置 TypeScript、CSS 预处理器等支持
 * - 生产环境使用 Rollup 打包，输出优化后的代码
 */
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  // 插件配置：扩展 Vite 的功能
  plugins: [
    // Vue 官方插件，用于解析和编译 .vue 单文件组件
    vue(),
    // Vue DevTools 插件，提供浏览器调试工具
    // 支持组件树查看、状态检查、时间旅行调试等功能
    vueDevTools(),
  ],
  // 模块解析配置
  resolve: {
    // 路径别名配置：简化模块导入路径
    alias: {
      // 将 '@' 映射到 './src' 目录
      // 例如：import xxx from '@/api/student' 等价于 import xxx from './src/api/student'
      // 使用 fileURLToPath 和 URL 构造函数确保跨平台路径兼容性
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
