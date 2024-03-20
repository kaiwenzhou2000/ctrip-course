import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import removeConsole from './plugins/removeConsole'; 


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), removeConsole()],
  // plugins: [vue()],
  css: {
    // 预处理器配置项
    preprocessorOptions: {
      less: {
        math: "always",
      },
    },
  }
})
