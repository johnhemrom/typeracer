import { defineConfig } from "vite";

export default defineConfig({
  server: {
    proxy: {
      // Dev: npm run race-server + npm run dev
      "/race": {
        target: "http://localhost:8787",
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/race/, "")
      }
    }
  },
  preview: {
    proxy: {
      "/race": {
        target: "http://localhost:8787",
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/race/, "")
      }
    }
  }
});
