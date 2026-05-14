<template>
  <!-- 
    根组件：整个应用的顶层组件
    仅提供路由视图占位符，所有页面内容由子路由组件渲染
  -->
  <router-view />
</template>

<style>
/* 
  全局样式：不使用 scoped，会应用到整个应用 
  重置浏览器默认样式，确保页面铺满
*/
body {
  margin: 0;    /* 清除默认外边距 */
  padding: 0;   /* 清除默认内边距 */
}
</style>
