import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://www.mocky.io", // Replace this with the actual server URL
        changeOrigin: true,
      },
    },
  },
});
