<script lang="ts" setup></script>

<template>
  comp1使用less编写样式
  <div class="parent">
    parent
    <div class="child">child</div>
  </div>
</template>

<style lang="less">
.parent {
  height: 500px;
  width: 500px;
  background-color: aqua;
  .child {
    height: 200px;
    width: 200px;
    background-color: red;
  }
}

</style>