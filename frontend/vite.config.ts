import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tsconfigPaths from 'vite-tsconfig-paths'

import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  server: { host: '0.0.0.0' },
  plugins: [
    vue(), tsconfigPaths(),
    Components({resolvers: [NaiveUiResolver()]})
  ],
})
