# Vue 3 + ElementPlus 学生管理系统（教学项目）

这是一个基于 **Vue 3 + Vite + ElementPlus** 的学生管理系统教学项目，采用 Composition API 编写，适合 Vue 初学者学习前端开发的完整流程。

## 📚 项目简介

本项目实现了一个完整的学生信息管理功能，包括：
- **学生列表查询**：支持按学号、姓名、性别、年级、班级、创建时间范围进行筛选
- **新增学生**：填写学生基本信息，表单校验
- **编辑学生**：修改已有学生信息
- **删除学生**：二次确认后删除

项目使用 **Mock 数据** 模拟后端 API，无需真实服务器即可完整运行和调试，非常适合教学和练习。

## 🏗️ 技术栈

| 技术 | 版本 | 作用 |
|------|------|------|
| Vue 3 | ^3.5.32 | 前端框架（Composition API） |
| Vite | ^8.0.8 | 前端构建工具 |
| ElementPlus | ^2.14.0 | UI 组件库 |
| Vue Router | ^4.6.4 | 路由管理 |
| Axios | ^1.16.0 | HTTP 请求库 |

## 💻 环境准备与运行

### 前置要求

- **Node.js**：需要 Node.js 20.19.0 或 22.12.0 以上版本
  - 检查当前版本：`node -v`
  - 下载：https://nodejs.org/

### 第一步：安装依赖

克隆或下载项目后，进入项目目录并安装所有依赖：

```bash
# 进入项目目录
cd vue3-element-demo

# 安装依赖（会根据 package.json 下载所有需要的包到 node_modules 目录）
npm install
```

**`npm install` 做了什么？**
- 读取 `package.json` 中的 `dependencies` 和 `devDependencies`
- 从 npm 仓库下载对应的包
- 生成 `package-lock.json` 锁定版本号，确保他人安装时版本一致
- 创建 `node_modules` 目录存放下载的依赖

### 第二步：启动开发服务器

```bash
npm run dev
```

执行后你会看到类似如下输出：

```
  VITE v8.0.8  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  Vue DevTools: Open in browser
```

打开浏览器访问 `http://localhost:5173/` 即可看到项目。

**开发服务器特性：**
- **热更新（HMR）**：修改代码后浏览器自动刷新，无需手动重启
- **按需编译**：只编译当前访问的模块，启动速度极快
- **Source Map**：支持浏览器调试，可直接看到源码而非打包后的代码

### 第三步：本地测试构建

在部署到生产环境之前，建议先在本地测试构建产物是否符合预期：

```bash
# 构建生产代码（打包、压缩、优化）
npm run build

# 本地预览构建产物（模拟生产环境）
npm run preview
```

**`npm run build` 做了什么？**
1. **代码编译**：将 `.vue` 文件编译为原生 JavaScript
2. **代码分割**：根据路由懒加载配置，将代码拆分为多个 chunk
3. **代码压缩**：去除注释、空格，混淆变量名
4. **静态资源处理**：压缩图片、内联小文件、添加 hash 版本号
5. **输出到 dist/**：构建产物存放在 `dist/` 目录

**`npm run preview` 的作用：**
在本地启动一个静态服务器，访问构建后的 `dist/` 目录。这样可以验证构建产物是否正常，而无需部署到远程服务器。

### 第四步：代码检查

提交代码前建议运行代码检查，确保代码规范：

```bash
npm run lint
```

如果发现问题，会根据配置给出警告或错误提示。

### 命令速查表

| 命令 | 作用 | 使用场景 |
|------|------|----------|
| `npm install` | 安装项目依赖 | 首次下载项目后必须执行 |
| `npm run dev` | 启动开发服务器 | 日常开发、调试代码 |
| `npm run build` | 构建生产代码 | 准备部署上线 |
| `npm run preview` | 预览构建产物 | 构建后本地验证 |
| `npm run lint` | 代码规范检查 | 提交代码前检查 |

## 📁 项目结构

```
vue3-element-demo/
├── index.html              # 项目入口文件（Vite 项目的入口）
├── vite.config.js          # Vite 构建工具配置
├── package.json            # 项目依赖和脚本配置
├── jsconfig.json           # JavaScript 项目配置（路径别名）
├── eslint.config.js        # ESLint 代码检查配置
├── .gitignore              # Git 忽略规则
├── .vscode/
│   └── extensions.json     # VSCode 推荐插件
│
├── public/                 # 静态资源目录（不被 Vite 打包处理）
│   └── favicon.ico         # 网站图标
│
└── src/                    # 源代码目录
    ├── main.js             # 应用入口：创建 Vue 实例、注册插件
    ├── App.vue             # 根组件：路由视图占位符
    │
    ├── router/
    │   └── index.js        # 路由配置：页面导航、懒加载
    │
    ├── utils/
    │   └── request.js      # Axios 封装：拦截器、统一错误处理
    │
    ├── api/
    │   └── student.js      # 学生相关 API 接口封装
    │
    ├── mock/
    │   └── student.js      # Mock 数据：模拟后端 API
    │
    ├── layout/
    │   └── MainLayout.vue  # 主布局组件：侧边栏 + 内容区
    │
    ├── views/
    │   ├── StudentList.vue # 学生列表页：搜索、表格、分页
    │   └── StudentForm.vue # 学生表单页：新增/编辑
    │
    └── assets/
        └── logo.svg        # 项目 Logo
```

## 🔧 项目配置详解

### 1. Vite 配置（vite.config.js）

**Vite 是什么？**
Vite 是新一代前端构建工具，相比传统的 webpack 有以下优势：
- **极速启动**：基于浏览器原生 ESM，无需打包即可开发
- **热更新快**：HMR（模块热替换）速度快
- **生产构建**：使用 Rollup 打包，输出优化后的代码

**配置文件解析：**

```js
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  // 插件配置
  plugins: [
    vue(),              // Vue 官方插件，用于解析和编译 .vue 文件
    vueDevTools(),      // Vue DevTools 插件，提供浏览器调试面板
  ],
  // 模块解析配置
  resolve: {
    alias: {
      // 路径别名：将 '@' 映射到 './src' 目录
      // 作用：简化导入路径
      // 示例：import xxx from '@/api/student'
      // 等价于：import xxx from './src/api/student'
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
```

**路径别名原理：**
`fileURLToPath(new URL('./src', import.meta.url))` 用于跨平台路径兼容。Windows 和 macOS 的路径格式不同，使用 URL 转换可以确保在任何系统上都能正确解析。

### 2. package.json 配置

**核心脚本命令：**

```json
{
  "scripts": {
    "dev": "vite",          // 启动开发服务器（热更新）
    "build": "vite build",  // 构建生产代码（打包到 dist/ 目录）
    "preview": "vite preview", // 本地预览构建产物
    "lint": "eslint src/"   // 运行 ESLint 检查代码规范
  }
}
```

**依赖分类：**

| 字段 | 含义 | 安装命令 |
|------|------|----------|
| `dependencies` | 运行时依赖（项目运行时需要） | `npm install xxx` |
| `devDependencies` | 开发时依赖（仅开发时需要） | `npm install xxx -D` |

### 3. ESLint 配置（eslint.config.js）

ESLint 用于检查 JavaScript/Vue 代码中的：
- 语法错误
- 代码风格问题（缩进、引号、分号等）
- 潜在 bug（未使用的变量等）

```js
import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import globals from 'globals'

export default [
  js.configs.recommended,         // JavaScript 推荐规则
  ...pluginVue.configs['flat/essential'], // Vue 基础规则
  {
    languageOptions: {
      globals: {
        ...globals.browser   // 启用浏览器全局变量（window、document 等）
      }
    }
  },
  {
    rules: {
      // 未使用变量警告（而非错误）
      // argsIgnorePattern: '^_' 表示以 _ 开头的参数不检查
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      // 关闭 Vue 组件多单词命名要求
      'vue/multi-word-component-names': 'off'
    }
  }
]
```

### 4. jsconfig.json 配置

此文件告诉 VSCode/WebStorm 如何解析路径：

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]  // 告诉编辑器 @/ 对应 ./src/
    }
  },
  "exclude": ["node_modules", "dist"]
}
```

**作用**：当你使用 `@/` 导入模块时，IDE 能提供正确的代码补全和跳转。

## 🚀 项目运行原理

### Vue 应用启动流程

```
index.html（入口文件）
    ↓
src/main.js（创建 Vue 实例）
    ↓
注册 ElementPlus（UI 组件库）
    ↓
注册 Vue Router（路由管理）
    ↓
引入 Mock 数据（拦截 HTTP 请求）
    ↓
挂载到 #app 元素
    ↓
App.vue（根组件，包含 router-view）
    ↓
router 匹配路由 → 渲染对应组件
```

### 1. index.html（Vite 入口）

```html
<!DOCTYPE html>
<html lang="">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vite App</title>
  </head>
  <body>
    <div id="app"></div>  <!-- Vue 应用挂载点 -->
    <script type="module" src="/src/main.js"></script>  <!-- 入口 JS -->
  </body>
</html>
```

**注意**：Vite 项目将 `index.html` 放在项目根目录，而不是 `public/` 目录。这是因为 Vite 将 `index.html` 视为**模块入口**，而非 HTML 模板。

### 2. main.js（应用入口）

```js
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import './mock/student'  // 引入 Mock 数据

const app = createApp(App)  // 创建 Vue 实例
app.use(ElementPlus)        // 全局注册 ElementPlus
app.use(router)             // 全局注册路由
app.mount('#app')           // 挂载到 DOM
```

**`app.use()` 的作用**：
- 调用插件的 `install` 方法
- 全局注册组件（如 `el-button`、`el-table`）
- 注入全局属性（如 `router`、`$router`）

### 3. 路由系统（router/index.js）

```js
import { createRouter, createWebHashHistory } from 'vue-router'
import MainLayout from '@/layout/MainLayout.vue'

const routes = [
  { path: '/', redirect: '/students' },
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: 'students',
        name: 'StudentList',
        component: () => import('@/views/StudentList.vue')  // 懒加载
      },
      { path: 'students/add', component: () => import('@/views/StudentForm.vue') },
      { path: 'students/edit/:studentId', component: () => import('@/views/StudentForm.vue') }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),  // Hash 模式（URL 中带 #）
  routes
})
```

**懒加载原理：**
`() => import('@/views/StudentList.vue')` 是一个动态导入，只有当用户访问对应路由时，才会加载该组件的代码。这样可以**减小首屏加载体积**。

**Hash 模式 vs History 模式：**
- Hash 模式：`http://localhost:5173/#/students`（不需要服务器配置）
- History 模式：`http://localhost:5173/students`（需要服务器配置 404 回退）

### 4. Mock 数据系统（mock/student.js）

**为什么需要 Mock？**
- 后端接口未开发完成时，前端可以先开发和测试
- 演示或教学时不需要真实服务器

**Mock 工作原理：**

```js
import axios from 'axios'

// 自定义 axios 适配器
const mockAdapter = (config) => {
  return new Promise((resolve) => {
    // 根据 URL 和方法名分发到不同处理函数
    if (config.url === '/api/students' && config.method === 'get') {
      resolve(handleListRequest(config))
    }
    // ... 其他路由
  })
}

// 替换 axios 默认适配器
axios.defaults.adapter = mockAdapter
```

替换适配器后，所有 axios 请求都会被 Mock 拦截，**不会真正发送到网络**。

## 💡 核心功能实现

### 1. 搜索与分页（StudentList.vue）

```js
// 构建请求参数
function buildParams() {
  const params = {
    page: pagination.value.currentPage,
    pageSize: pagination.value.pageSize
  }
  // 过滤空值字段
  if (searchForm.value.name) params.name = searchForm.value.name
  // ... 其他筛选条件
  return params
}

// 获取数据
async function fetchData() {
  loading.value = true
  try {
    const res = await getStudentList(buildParams())
    tableData.value = res.data.list
    pagination.value.total = res.data.total
  } finally {
    loading.value = false
  }
}
```

### 2. 表单校验（StudentForm.vue）

```js
const rules = {
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  gender: [{ required: true, message: '请选择性别', trigger: 'change' }]
}

// 提交时校验
async function handleSubmit() {
  await formRef.value.validate()  // 校验不通过会抛出异常
  // 校验通过，执行提交逻辑
}
```

### 3. 编辑/新增模式切换

```js
// 根据路由参数判断模式
const isEdit = computed(() => !!route.params.studentId)

// 编辑模式：加载数据
onMounted(() => {
  if (isEdit.value) {
    loadStudentData()
  }
})
```

### 4. Axios 请求封装（utils/request.js）

```js
const service = axios.create({
  baseURL: '',       // 基础路径
  timeout: 10000     // 超时时间：10 秒
})

// 响应拦截器：统一处理错误
service.interceptors.response.use(
  (response) => {
    const res = response.data
    if (res.code !== 200) {
      ElMessage.error(res.message || '请求失败')
      return Promise.reject(new Error(res.message))
    }
    return res
  },
  (error) => {
    ElMessage.error(error.message || '网络异常')
    return Promise.reject(error)
  }
)
```

**拦截器的作用**：
- **请求拦截器**：在请求发送前处理（如添加 token）
- **响应拦截器**：统一处理响应，避免在每个接口处重复写错误提示

## 📦 生产构建与部署

```bash
# 构建生产代码
npm run build

# 本地预览构建结果
npm run preview
```

构建后的文件会输出到 `dist/` 目录，可以部署到任何静态服务器（如 Nginx、Vercel、Netlify 等）。

## 🛠️ 开发建议

1. **IDE 推荐**：VSCode + Vue Official 插件
2. **浏览器调试**：安装 Vue DevTools 扩展
3. **代码检查**：提交前运行 `npm run lint`
4. **热更新**：修改代码后浏览器自动刷新，无需手动重启

## 📖 学习路线

如果你是 Vue 初学者，建议按以下顺序学习本项目：

1. **运行项目**：安装依赖 → 启动开发服务器 → 浏览器访问
2. **项目结构**：了解每个文件和目录的作用
3. **main.js**：理解 Vue 应用的启动流程
4. **路由系统**：掌握路由配置和页面跳转
5. **组件开发**：学习 Vue 3 Composition API（`ref`、`reactive`、`computed`）
6. **API 调用**：理解 Axios 请求和拦截器
7. **表单处理**：学习 ElementPlus 表单组件和校验
8. **Mock 数据**：了解如何模拟后端 API

祝学习愉快！🎉
