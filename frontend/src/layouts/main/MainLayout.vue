<template>
  <div has-sider class="main-layout">

    <div class="layout-container">
      <div class="layout-menu"> 
        <n-menu :value="router.path" :options="menu"/>
      </div>

      <div class="layout-slot">
        <slot/>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
  import { getMenu } from '@src/router'
  import { useRoute } from 'vue-router';

  const menu = getMenu();
  const router = useRoute();
</script>

<style lang="scss" scoped>
  @import "./MainLayout.scss";
</style>