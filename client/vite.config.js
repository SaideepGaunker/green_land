import path from "path";
import svgr from 'vite-plugin-svgr';
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // server: {
  //   hmr: {
  //     overlay: false, // Disable the error overlay in the browser
  //   },
  // },
});

