import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
// the API proxy target can be overridden at runtime using
// `API_PROXY_TARGET` env variable (set by docker-compose when containers
// run in the same network).  Otherwise we assume the backend is on
// localhost:3000, which is convenient for local development.
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: process.env.API_PROXY_TARGET || "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
});
