<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <router-view/>
  </n-config-provider>
</template>

<script setup lang="ts">
  import { GlobalThemeOverrides } from 'naive-ui'

  const themeOverrides: GlobalThemeOverrides = {
    common: {
      // primaryColor: '#475569',
      // primaryColorSuppl: '#475569',
      // primaryColorHover: '#64748B',
      // primaryColorPressed: '#475569',
    },
    Input: {
      boxShadowFocus: null,
    }
  }
</script>

<style lang="scss" scoped>
  @import "./App.scss";
</style>