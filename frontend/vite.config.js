import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    host: "0.0.0.0",
    port: 4173,
  },
});
