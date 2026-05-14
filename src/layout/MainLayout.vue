/**
 * 主布局组件
 * 
 * 此组件定义了整个应用的页面布局结构，包括：
 * - 左侧边栏（导航菜单）
 * - 右侧主内容区（子路由渲染区域）
 * 
 * 布局使用了 ElementPlus 的 Container 布局容器组件
 */
<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// useRoute：获取当前路由信息对象（如 path、params、query 等）
const route = useRoute()
// useRouter：获取路由实例，可用于编程式导航（router.push、router.replace 等）
const router = useRouter()

/**
 * 计算当前应该高亮的菜单项
 * 根据当前路由路径返回对应的菜单 index
 * 用于侧边栏菜单高亮显示
 */
const activeMenu = computed(() => {
  const path = route.path
  // 如果是新增或编辑页面，高亮“新增”菜单项
  if (path.startsWith('/students/add') || path.startsWith('/students/edit')) {
    return '/students/add'
  }
  // 其他情况（如列表页）高亮“查询”菜单项
  return '/students'
})

/**
 * 菜单选择事件处理
 * 当用户点击侧边栏菜单时触发，进行页面跳转
 * @param {string} index - 被点击的菜单项的 index 值
 */
function handleMenuSelect(index) {
  router.push(index)
}
</script>

<template>
  <!-- 
    页面布局容器：height: 100vh 表示铺满整个视口高度
    el-container：外层容器，可以是嵌套的
  -->
  <el-container style="height: 100vh">
    <!-- 
      左侧边栏：宽度 220px，背景色为深蓝灰色 
      el-aside：侧边栏容器
    -->
    <el-aside width="220px" style="background-color: #304156">
      <!-- 系统 Logo / 标题区域 -->
      <div class="logo">学生管理系统</div>
      
      <!-- 
        侧边栏菜单组件
        :default-active：当前高亮的菜单项
        background-color：菜单背景色
        text-color：菜单文字颜色
        active-text-color：高亮菜单文字颜色
        router：开启路由模式，点击菜单自动跳转
        @select：菜单选择事件
      -->
      <el-menu
        :default-active="activeMenu"
        background-color="#304156"
        text-color="#bfcbd9"
        active-text-color="#409eff"
        router
        @select="handleMenuSelect"
      >
        <!-- 学生信息查询菜单项 -->
        <el-menu-item index="/students">
          <el-icon><i class="el-icon-search" /></el-icon>
          <span>学生信息查询</span>
        </el-menu-item>
        
        <!-- 学生信息新增菜单项 -->
        <el-menu-item index="/students/add">
          <el-icon><i class="el-icon-plus" /></el-icon>
          <span>学生信息新增</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    
    <!-- 
      主内容区域：显示子路由组件（如 StudentList、StudentForm 等）
      el-main：主内容容器
      padding: 20px - 内边距，让内容与边缘有一定距离
      background-color: #f0f2f5 - 浅灰色背景，与白色卡片形成对比
      :key="route.fullPath" - 确保同一路由参数变化时强制重新渲染
    -->
    <el-main style="padding: 20px; background-color: #f0f2f5">
      <router-view :key="route.fullPath" />
    </el-main>
  </el-container>
</template>

<style scoped>
/* 
  Logo/标题样式
  居中显示，白色文字，比背景色略深以形成区分
*/
.logo {
  height: 60px;
  line-height: 60px;   /* 垂直居中 */
  text-align: center;  /* 水平居中 */
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  background-color: #263445;
}
</style>
