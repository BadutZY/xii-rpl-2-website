import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

// Standard Vite + React SPA config (index.html as the entry point).
export default defineConfig({
  plugins: [tsconfigPaths(), react(), tailwindcss()],
  server: {
    host: true,
  },
});
