// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, "index.html"),
        index2: resolve(__dirname, "index2.html"),
      },
    },
  },
  resolve: {
    alias: {
      // 确保别名配置正确（已正确，但补充通配符增强兼容性）
      "@": resolve(__dirname, "./src"),
      "@/*": resolve(__dirname, "./src/*"), // 新增：显式匹配子路径
    },
    // 核心修复：添加扩展名解析，让 Vite 自动识别 .tsx/.jsx 等
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },
});
