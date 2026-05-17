```json
{
  // 项目名称，也是 npm 包的名称。如果发布到 npm 仓库，别人用这个名字安装你的包
  "name": "vue3-element-demo",

  // 版本号，格式：主版本.次版本.修订号。当前是 0.0.0，表示开发阶段
  "version": "0.0.0",

  // 标记为私有项目，设置为 true 后执行 npm publish 会报错，防止误操作把代码发布到公网
  // 公司内部项目、个人学习项目都应该加这个
  "private": true,

  // 指定模块类型为 ES Module，项目中的 .js 文件默认使用 import/export 语法
  // 不写这行的话，默认是 CommonJS（require/module.exports）
  "type": "module",

  // npm 脚本命令，通过 npm run xxx 执行对应的命令
  "scripts": {
    // 启动开发服务器，Vite 会启动一个本地服务器（通常是 http://localhost:5173），监听文件变化自动刷新浏览器
    "dev": "vite",

    // 生产构建（打包），Vite 会把代码压缩、优化，输出到 dist 目录，用于部署到生产服务器
    "build": "vite build",

    // 预览生产构建结果，先执行 build 打包后，用 preview 可以在本地模拟生产环境预览效果
    "preview": "vite preview",

    // 代码检查，ESLint 会检查 src 目录下的代码是否符合规范，发现语法错误、风格问题、潜在 bug
    "lint": "eslint src/"
  },

  // 生产依赖：项目运行时必须用到的包，执行 npm install 时会安装，打包时这些代码会被包含进最终产物
  "dependencies": {
    // HTTP 请求库，用于向后端 API 发送请求（GET、POST 等）
    "axios": "^1.16.0",

    // 基于 Vue 3 的 UI 组件库，提供按钮、表格、表单、弹窗等现成组件，不用自己写样式
    "element-plus": "^2.14.0",

    // Vue 3 框架核心，提供响应式系统、组件化、虚拟 DOM 等核心能力
    "vue": "^3.5.32",

    // Vue 官方路由管理器，实现单页面应用（SPA）的路由跳转，如 /students、/about 等页面切换
    "vue-router": "^4.6.4"
  },

  // 开发依赖：只在开发时使用，不会打包进最终产物。执行 npm install 时也会安装，但生产环境部署时不需要
  "devDependencies": {
    // ESLint 官方提供的 JavaScript 规则配置，定义了代码检查的基本规则
    "@eslint/js": "^9.39.4",

    // Vite 的 Vue 插件，让 Vite 能编译 .vue 单文件组件（SFC）
    "@vitejs/plugin-vue": "^6.0.6",

    // 代码检查工具，自动发现代码中的语法错误、风格问题、潜在 bug
    "eslint": "^9.39.4",

    // ESLint 的 Vue 插件，提供 Vue 单文件组件的专用检查规则
    "eslint-plugin-vue": "^10.9.1",

    // 全局变量定义，告诉 ESLint 哪些全局变量是合法的（如 browser 环境的 window、document）
    "globals": "^17.6.0",

    // 前端构建工具，提供开发服务器、热更新、生产打包等功能
    "vite": "^8.0.8",

    // Vite 的 Vue DevTools 插件，在浏览器开发者工具中提供 Vue 组件树、状态调试等功能
    "vite-plugin-vue-devtools": "^8.1.1"
  },

  // 运行环境要求，指定项目运行所需的 Node.js 版本范围，如果当前版本不符合，npm 会给出警告
  "engines": {
    // ^20.19.0 表示 20.x.x 且 >= 20.19.0，>=22.12.0 表示 22.12.0 及以上版本，|| 表示满足任一条件即可
    "node": "^20.19.0 || >=22.12.0"
  }
}
```

## 版本号前缀说明

| 符号 | 含义 | 示例 |
|------|------|------|
| `^` | 允许更新到不修改最左边非零数字的最新版本 | `^1.16.0` 允许 1.x.x，不允许 2.0.0 |
| `~` | 允许更新到修订号的最新版本 | `~1.16.0` 允许 1.16.x，不允许 1.17.0 |
| 无 | 固定版本 | `1.16.0` 只允许这个版本 |
| `>=` | 大于等于指定版本 | `>=22.12.0` |

## dependencies 和 devDependencies 的区别

| 特性 | dependencies | devDependencies |
|------|-------------|-----------------|
| 安装时机 | `npm install` 时安装 | `npm install` 时安装 |
| 生产环境需要 | 是 | 否 |
| 打包进产物 | 是 | 否 |
| 典型例子 | vue、axios、element-plus | vite、eslint、各种插件 |

**判断标准**：项目运行时是否需要这个包？需要就放到 dependencies，只是开发工具就放到 devDependencies。
