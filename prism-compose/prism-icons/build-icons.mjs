#!/usr/bin/env node
/**
 * Icon generator — ports src/components/Icon/icons.ts (48 stroked 24x24 SVG
 * paths) into Kotlin. Compose parses the raw `d` string at build via
 * addPathNodes(), so no SVG parser is needed. Runtime strokeWidth is preserved
 * via prismIconVector(name, strokeWidth) — addressing the §4 v2 limitation that
 * baking an ImageVector would otherwise lose the React `strokeWidth` prop.
 *
 *   node build-icons.mjs
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = resolve(HERE, "..", "..");
const SRC = resolve(REPO, "src/components/Icon/icons.ts");
const OUT = resolve(
  HERE,
  "src/commonMain/kotlin/io/github/heartcoolman/prism/icons/PrismIconPaths.kt",
);

const ts = readFileSync(SRC, "utf8");
const entries = [];
const re = /(\w+):\s*"([^"]+)"/g;
let m;
while ((m = re.exec(ts))) entries.push([m[1], m[2]]);
if (entries.length < 40) throw new Error(`only parsed ${entries.length} icons — check icons.ts format`);

const pascal = (s) => s.charAt(0).toUpperCase() + s.slice(1);

const mapLines = entries.map(([n, d]) => `    "${n}" to "${d}",`).join("\n");
const objLines = entries
  .map(([n]) => `    val ${pascal(n)}: ImageVector by lazy(LazyThreadSafetyMode.NONE) { prismIconVector("${n}") }`)
  .join("\n");

const out = `// ============================================================
// GENERATED from src/components/Icon/icons.ts — do not edit by hand.
// Run: node build-icons.mjs   (${entries.length} icons)
// ============================================================
package io.github.heartcoolman.prism.icons

import androidx.compose.ui.graphics.vector.ImageVector

/** Raw 24x24 stroked SVG path data for each built-in icon. */
internal val prismIconPaths: Map<String, String> = mapOf(
${mapLines}
)

/** Type-safe accessors for the built-in icon set (2px stroke default). */
object PrismIcons {
${objLines}

    /** Look up by name (e.g. for data-driven icons). */
    fun byName(name: String): ImageVector = prismIconVector(name)
}
`;

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, out);
console.log(`✓ wrote ${OUT.replace(REPO + "/", "")} (${entries.length} icons)`);
