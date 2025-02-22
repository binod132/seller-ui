import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Port for the development server
    open: true, // Automatically open the app in the browser
  },
  preview: {
    port: 3000, // Port for the production preview server
  },
  build: {
    outDir: "dist", // Output directory for the production build
  },
});