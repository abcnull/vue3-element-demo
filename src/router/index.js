/**
 * Vue Router 路由配置文件
 * 
 * 路由是 Vue 应用中页面导航的核心机制，负责：
 * - 定义 URL 与组件的映射关系
 * - 管理页面跳转和历史记录
 * - 支持嵌套路由、动态路由、懒加载等功能
 */
import { createRouter, createWebHashHistory } from 'vue-router'
import MainLayout from '@/layout/MainLayout.vue'

// 路由配置数组：定义应用的所有路由规则
const routes = [
  // 根路径重定向：访问 / 时自动跳转到 /students
  {
    path: '/',
    redirect: '/students'
  },
  // 主布局路由：包含侧边栏和主内容区
  // 所有子路由都会渲染在 MainLayout 的 router-view 中
  {
    path: '/',
    component: MainLayout,
    // 子路由：显示在 MainLayout 主内容区的页面
    children: [
      // 学生列表页：显示所有学生信息及搜索、分页功能
      {
        path: 'students',
        name: 'StudentList',
        // 懒加载：只有在访问此路由时才会加载对应的组件代码
        // 可以减小首屏加载体积，提升性能
        component: () => import('@/views/StudentList.vue')
      },
      // 学生新增页：用于添加新的学生信息
      {
        path: 'students/add',
        name: 'StudentAdd',
        component: () => import('@/views/StudentForm.vue')
      },
      // 学生编辑页：用于修改已有学生信息
      // :studentId 是动态路由参数，通过 row.studentId 传入
      {
        path: 'students/edit/:studentId',
        name: 'StudentEdit',
        component: () => import('@/views/StudentForm.vue')
      }
    ]
  }
]

// 创建路由实例
const router = createRouter({
  // 使用 Hash 模式（URL 中带有 # 号）
  // 例如：http://localhost:5173/#/students
  // 优点：不需要服务器配置，适合静态部署
  history: createWebHashHistory(),
  routes
})

export default router
