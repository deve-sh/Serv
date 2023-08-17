import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "./src/index.ts",
  },
  splitting: true,
  sourcemap: false,
  clean: true,
  minify: true,
});
