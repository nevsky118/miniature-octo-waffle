import path from "node:path"
import tailwindcss from "@tailwindcss/vite"
import { devtools } from "@tanstack/devtools-vite"
import { tanstackRouter } from "@tanstack/router-plugin/vite"
import viteReact from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"

const config = defineConfig({
  base: "/miniature-octo-waffle/",
  plugins: [
    devtools(),
    tsconfigPaths({ projects: ["./tsconfig.json"] }),
    tailwindcss(),
    tanstackRouter({ target: "react", autoCodeSplitting: true }),
    viteReact(),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react/jsx-runtime", "react-dom", "react-dom/client"],
          router: ["@tanstack/react-router"],
          redux: ["@reduxjs/toolkit", "react-redux", "redux-persist"],
          ui: ["radix-ui", "vaul", "sonner", "lucide-react"],
        },
      },
    },
  },
  resolve: {
    alias: {
      "@/shared": path.resolve("src", "shared"),
      "@/entities": path.resolve("src", "entities"),
      "@/features": path.resolve("src", "features"),
      "@/widgets": path.resolve("src", "widgets"),
      "@/pages": path.resolve("src", "pages"),
      "@/app": path.resolve("src", "app"),
    },
  },
})

export default config
