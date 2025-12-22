import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";
export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        advance: resolve(__dirname, "advance.html"),
        radiate: resolve(__dirname, "radiate.html"),
        about: resolve(__dirname, "about.html"),
        careers: resolve(__dirname, "careers.html"),
        dinner: resolve(__dirname, "dinner.html"),
        partnership: resolve(__dirname, "partnership.html"),
        resources: resolve(__dirname, "resources.html"),
        quantumSafe: resolve(__dirname, "quantum-safe.html"),
        contact: resolve(__dirname, "contact.html"),
      },
    },
  },
});
