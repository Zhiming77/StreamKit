import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // TODO (Step 6): Add a proxy here so /api requests go to your backend
  // server: {
  //   proxy: {
  //     "/api": "http://localhost:3001",
  //   },
  // },
});
