<script setup lang="ts">
</script>

<template>
    <h1>vue-vite-less-typescript</h1>
    <p>
      <!-- 使用 router-link 组件进行导航 -->
      <!-- 通过传递 `to` 来指定链接 -->
      <!-- `<router-link>` 将呈现一个带有正确 `href` 属性的 `<a>` 标签 -->
      <router-link to="/">Go to comp1</router-link> <br/>
      <router-link to="/about">Go to comp2</router-link>
    </p>
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view></router-view>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
