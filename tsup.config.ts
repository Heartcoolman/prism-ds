import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: false,
  clean: true,
  treeshake: true,
  external: ["react", "react-dom", "react/jsx-runtime"],
  injectStyle: false,
  outExtension({ format }) {
    return { js: format === "cjs" ? ".cjs" : ".js" };
  },
});
