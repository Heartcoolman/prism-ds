// Builds the demo into a single self-contained IIFE bundle (demo/app.js)
// that opens directly from file:// — no dev server, no network at runtime.
// React + react-dom + @prism-ds/react (from ../dist) are all inlined.
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const esbuild = resolve(root, "node_modules/.bin/esbuild");

execFileSync(esbuild, [
  "demo/main.jsx",
  "--bundle",
  "--format=iife",
  "--jsx=automatic",
  "--minify",
  '--define:process.env.NODE_ENV="production"',
  "--target=es2020",
  "--outfile=demo/app.js",
], { cwd: root, stdio: "inherit" });
