import { defineConfig } from "vite";

export default defineConfig({
  esbuild: {
    minify: true,
  },
  build: {
    lib: {
      entry: "src/index.js",
      name: "roundjs",
      fileName: (format) => `roundjs.${format}.js`,
    },
  },
});
