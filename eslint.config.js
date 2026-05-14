/**
 * ESLint 代码检查配置文件
 * ESLint 用于检查 JavaScript/Vue 代码中的：
 * - 语法错误
 * - 代码风格问题（如缩进、引号、分号等）
 * - 潜在 bug（如未使用的变量、可能的类型错误等）
 * 
 * 本文件使用 ESLint 9.x 的 Flat Config 格式（最新配置方式）
 */
import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import globals from 'globals'

export default [
  // 应用 JavaScript 官方推荐的代码规范
  js.configs.recommended,
  
  // 应用 Vue 官方推荐的代码规范（flat/essential 级别）
  // essential 级别规则是最关键和基础的检查项
  ...pluginVue.configs['flat/essential'],
  
  // 针对浏览器环境的全局变量配置
  {
    languageOptions: {
      globals: {
        // 引入浏览器环境的全局变量（如 window、document、console 等）
        // 这样 ESLint 不会把这些内置对象报告为“未定义”
        ...globals.browser
      }
    }
  },
  
  // 自定义规则：覆盖默认规则
  {
    rules: {
      // 未使用变量的警告（而非错误）
      // argsIgnorePattern: '^_' 表示以 _ 开头的参数不会被检查
      // 例如：function foo(_unused) 不会报警告
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      
      // 关闭 Vue 组件多单词命名要求
      // 默认情况下 Vue 建议组件名使用多单词（如 StudentList），以避免与 HTML 元素冲突
      // 关闭后允许使用单单词组件名（如 App）
      'vue/multi-word-component-names': 'off'
    }
  }
]
