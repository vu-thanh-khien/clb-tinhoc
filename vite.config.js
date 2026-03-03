import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import { visualizer } from 'rollup-plugin-visualizer'; // Comment dòng này

export default defineConfig({
  plugins: [
    react(),
    // visualizer({  // Comment phần này
    //   open: true,
    //   gzipSize: true,
    //   brotliSize: true,
    // }),
  ],
  build: {
    target: "esnext",
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          ui: ["lucide-react", "recharts"],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  optimizeDeps: {
    include: ["react", "react-dom", "react-router-dom"],
  },
});
