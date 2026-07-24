import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    watch: {
      // 排除 vite.config.ts 自身，防止文件监听导致无限重启
      ignored: ["**/vite.config.ts"],
    },
    proxy: {
      "/agui": "http://localhost:8000",
      "/health": "http://localhost:8000",
      "/upload": "http://localhost:8000",
      "/conversations": "http://localhost:8000",
    },
  },
});
