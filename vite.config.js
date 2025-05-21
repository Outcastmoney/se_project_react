import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/se_project_react/' : '/',
  plugins: [react()],
  server: {
    port: 3000,
  },
});
