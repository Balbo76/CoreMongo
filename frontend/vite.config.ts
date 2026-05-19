import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter()],
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./app"),
      "@coremongo/shared": path.resolve(__dirname, "../shared/src/index.ts"),
    },
  },
  server: {
    host: "0.0.0.0",
    port: 3000,
    strictPort: true,
    fs: {
      allow: [".."],
    },
  },
  optimizeDeps: {
    exclude: ["@coremongo/shared"],
  },
  build: {
    commonjsOptions: {
      include: [/@coremongo\/shared/, /node_modules/],
    },
  },
});
