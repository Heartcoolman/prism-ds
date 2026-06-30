#!/usr/bin/env node
/**
 * Prism token generator — single source of truth -> CSS + Kotlin.
 *
 *   node build-tokens.mjs          generate CSS + Kotlin, then verify CSS parity
 *   node build-tokens.mjs --check  only verify generated CSS == production tokens.css (value-level)
 *
 * Implements COMPOSE-MIGRATION.md decision #6: one token source feeds both the
 * web (@prism-ds/react CSS variables) and Compose (prism-core Kotlin data classes),
 * so the two libraries cannot drift.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve as resolvePath } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = resolvePath(HERE, "..", "..");
const SRC = resolvePath(HERE, "prism-tokens.json");
const PROD_CSS = resolvePath(REPO, "src/styles/tokens.css");
const OUT_CSS = resolvePath(HERE, "generated/tokens.css");
const OUT_KT = resolvePath(
  HERE,
  "..",
  "prism-core/src/commonMain/kotlin/io/github/heartcoolman/prism/core/tokens/PrismGeneratedTokens.kt",
);

const T = JSON.parse(readFileSync(SRC, "utf8"));

/* ----------------------------- value helpers ----------------------------- */

const primitives = T.primitive.color;

/** Resolve a semantic value (ref | literal hex | rgba string) to a literal CSS color. */
function resolveColor(v) {
  if (v && typeof v === "object" && "ref" in v) {
    const hex = primitives[v.ref];
    if (!hex) throw new Error(`unknown primitive ref: ${v.ref}`);
    return hex;
  }
  return v;
}

/** CSS form of a semantic value: refs stay as var() to preserve the primitive->semantic layer. */
function cssColor(v) {
  if (v && typeof v === "object" && "ref" in v) return `var(--${v.ref})`;
  return v;
}

const trimFloat = (n) => {
  const s = (Math.round(n * 1e6) / 1e6).toString();
  return s;
};

/** Literal CSS color -> Kotlin Compose Color(...) expression. */
function kotlinColor(literal) {
  const hex = literal.match(/^#([0-9a-fA-F]{6})$/);
  if (hex) return `Color(0xFF${hex[1].toUpperCase()})`;
  const rgba = literal.match(/^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*(?:,\s*([\d.]+)\s*)?\)$/);
  if (rgba) {
    const [r, g, b] = [rgba[1], rgba[2], rgba[3]].map(Number);
    const a = rgba[4] == null ? 1 : Number(rgba[4]);
    return `Color(red = ${trimFloat(r / 255)}f, green = ${trimFloat(g / 255)}f, blue = ${trimFloat(b / 255)}f, alpha = ${trimFloat(a)}f)`;
  }
  throw new Error(`cannot convert color to Kotlin: ${literal}`);
}

const kColorOf = (v) => kotlinColor(resolveColor(v));

/** Extract the ring color from a CSS box-shadow focus-ring (e.g. "0 0 0 3px rgba(...)"). */
function kotlinRingColor(shadow) {
  const m = shadow.match(/rgba?\([^)]*\)/);
  if (!m) throw new Error(`no color in focus ring: ${shadow}`);
  return kotlinColor(m[0]);
}

const camel = (k) =>
  k.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());

/* ------------------------------ CSS emitter ------------------------------ */

function buildCss() {
  const L = [];
  L.push("/* ============================================================");
  L.push("   Prism Design Tokens — GENERATED from tokens/prism-tokens.json");
  L.push("   Do not edit by hand. Run: node tokens/build-tokens.mjs");
  L.push("   Value-level identical to src/styles/tokens.css (verified).");
  L.push("   ============================================================ */");
  L.push(":root {");

  L.push("  /* Primitive */");
  for (const [k, v] of Object.entries(primitives)) L.push(`  --${k}: ${v};`);

  L.push("  /* Semantic · Color */");
  for (const [k, v] of Object.entries(T.semantic.color.light)) L.push(`  --${k}: ${cssColor(v)};`);

  L.push("  /* Semantic · Typography */");
  L.push(`  --font-sans: ${T.semantic.typography.families.sans};`);
  L.push(`  --font-mono: ${T.semantic.typography.families.mono};`);
  for (const [k, s] of Object.entries(T.semantic.typography.styles)) {
    const fam = s.family === "mono" ? "var(--font-mono)" : "var(--font-sans)";
    L.push(`  --text-${k}: ${s.weight} ${s.size}px/${s.lineHeight} ${fam};`);
  }
  for (const [k, s] of Object.entries(T.semantic.typography.styles)) {
    if (s.tracking) L.push(`  --tracking-${k}: ${s.tracking};`);
  }

  L.push("  /* Semantic · Spacing */");
  for (const [k, v] of Object.entries(T.semantic.spacing)) L.push(`  --${k}: ${v}px;`);

  L.push("  /* Semantic · Radius */");
  for (const [k, v] of Object.entries(T.semantic.radius)) L.push(`  --radius-${k}: ${v}px;`);

  L.push("  /* Semantic · Elevation */");
  for (const [k, v] of Object.entries(T.semantic.elevation)) L.push(`  --${k}: ${v.css};`);

  L.push("  /* Semantic · Motion */");
  for (const [k, v] of Object.entries(T.semantic.motion)) {
    if (v.bezier) L.push(`  --${k}: cubic-bezier(${v.bezier.join(", ")});`);
    else L.push(`  --${k}: ${v.ms}ms;`);
  }

  L.push("  /* Component · Dimensions */");
  for (const [k, v] of Object.entries(T.component.dimensions)) L.push(`  --${k}: ${v}px;`);

  L.push("  /* Component · Materials */");
  for (const k of ["blur-thin", "blur-regular", "blur-thick"])
    L.push(`  --${k}: ${T.component.materials[k]}px;`);
  L.push(`  --material-bg: ${T.component.materials["material-bg"].light};`);

  L.push("  /* Component · Focus */");
  L.push(`  --focus-ring: ${T.component.focus["focus-ring"].light};`);
  L.push("}");
  L.push("");

  // Dark overrides (semantic colors + material-bg + focus-ring), duplicated for
  // system preference and explicit [data-theme="dark"], exactly as production.
  const darkBody = [];
  for (const [k, v] of Object.entries(T.semantic.color.dark)) darkBody.push(`  --${k}: ${cssColor(v)};`);
  darkBody.push(`  --material-bg: ${T.component.materials["material-bg"].dark};`);
  darkBody.push(`  --focus-ring: ${T.component.focus["focus-ring"].dark};`);

  L.push("@media (prefers-color-scheme: dark) {");
  L.push("  :root {");
  for (const line of darkBody) L.push("  " + line);
  L.push("  }");
  L.push("}");
  L.push("");
  L.push('[data-theme="dark"] {');
  for (const line of darkBody) L.push(line);
  L.push("}");
  L.push("");
  L.push('[data-theme="light"] {');
  L.push("  color-scheme: light;");
  L.push("}");
  L.push("");
  return L.join("\n");
}

/* ----------------------------- Kotlin emitter ---------------------------- */

function kTextStyle(s) {
  const lh = Math.round(s.size * s.lineHeight * 1000) / 1000;
  const parts = [
    "fontFamily = FontFamily.Default",
    `fontWeight = FontWeight(${s.weight})`,
    `fontSize = ${s.size}.sp`,
    `lineHeight = ${lh}.sp`,
  ];
  if (s.tracking) parts.push(`letterSpacing = ${parseFloat(s.tracking)}.em`);
  return `TextStyle(${parts.join(", ")})`;
}

function buildKotlin() {
  const light = T.semantic.color.light;
  const dark = T.semantic.color.dark;
  const colorFields = Object.keys(light); // 24 semantic color keys

  const colorsBlock = (scheme) => {
    const get = (k) => (scheme === "dark" && dark[k] !== undefined ? dark[k] : light[k]);
    const lines = colorFields.map((k) => `    ${camel(k.replace(/^color-/, ""))} = ${kColorOf(get(k))},`);
    lines.push(`    materialBg = ${kotlinColor(T.component.materials["material-bg"][scheme])},`);
    lines.push(`    focusRing = ${kotlinRingColor(T.component.focus["focus-ring"][scheme])},`);
    return lines.join("\n");
  };

  const typo = Object.entries(T.semantic.typography.styles)
    .map(([k, s]) => `    ${camel(k)} = ${kTextStyle(s)},`)
    .join("\n");

  const spacing = Object.entries(T.semantic.spacing)
    .map(([k, v]) => `    ${camel(k.replace("s-", "s"))} = ${v}.dp,`)
    .join("\n");

  const radius = Object.entries(T.semantic.radius)
    .map(([k, v]) => `    ${camel(k)} = ${v}.dp,`)
    .join("\n");

  const elevation = Object.entries(T.semantic.elevation)
    .map(([k, v]) => `    ${camel(k.replace("shadow-", "level").replace("levelcard", "card"))} = ${v.dp}.dp,`)
    .join("\n");

  const motion = Object.entries(T.semantic.motion)
    .map(([k, v]) =>
      v.bezier
        ? `    ${camel(k)} = CubicBezierEasing(${v.bezier.map((n) => n + "f").join(", ")}),`
        : `    ${camel(k)} = ${v.ms},`,
    )
    .join("\n");

  const dims = Object.entries(T.component.dimensions)
    .map(([k, v]) => `    ${camel(k.replace("control-h", "controlHeight"))} = ${v}.dp,`)
    .join("\n");
  const dimsAll = dims + `\n    focusRingWidth = 3.dp,`;

  const materials = ["blur-thin", "blur-regular", "blur-thick"]
    .map((k) => `    ${camel(k)} = ${T.component.materials[k]}.dp,`)
    .join("\n");

  const brand = (b) => {
    const o = T.brand[b];
    const c = (v) => kotlinColor(v);
    return [
      `val ${b}Brand: PrismBrand = PrismBrand(`,
      `    accent = ${c(o.accent)},`,
      `    accentHover = ${c(o.accentHover)},`,
      `    accentPressed = ${c(o.accentPressed)},`,
      `    success = ${c(o.success)},`,
      `    warning = ${c(o.warning)},`,
      `    danger = ${c(o.danger)},`,
      `    radiusPill = ${o.radiusPill}.dp,`,
      `    radiusCard = ${o.radiusCard}.dp,`,
      `    radiusModal = ${o.radiusModal}.dp,`,
      `    radiusInput = ${o.radiusInput}.dp,`,
      `    radiusImage = ${o.radiusImage}.dp,`,
      `    radiusSm = ${o.radiusSm}.dp,`,
      `)`,
    ].join("\n");
  };

  return `// ============================================================
// GENERATED from tokens/prism-tokens.json — do not edit by hand.
// Run: node tokens/build-tokens.mjs
// Single source of truth shared with the web CSS (COMPOSE-MIGRATION.md #6).
// ============================================================
package io.github.heartcoolman.prism.core.tokens

import androidx.compose.animation.core.CubicBezierEasing
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.em
import androidx.compose.ui.unit.sp

val lightPrismColors: PrismColors = PrismColors(
${colorsBlock("light")}
)

val darkPrismColors: PrismColors = PrismColors(
${colorsBlock("dark")}
)

val prismTypography: PrismTypography = PrismTypography(
${typo}
)

val prismSpacing: PrismSpacing = PrismSpacing(
${spacing}
)

val prismRadius: PrismRadius = PrismRadius(
${radius}
)

val prismElevation: PrismElevation = PrismElevation(
${elevation}
)

val prismMotion: PrismMotion = PrismMotion(
${motion}
)

val prismDimensions: PrismDimensions = PrismDimensions(
${dimsAll}
)

val prismMaterials: PrismMaterials = PrismMaterials(
${materials}
)

${brand("apple")}

${brand("neutral")}
`;
}

/* ------------------------------ CSS parity ------------------------------- */

function parseCssVars(css) {
  const noComments = css.replace(/\/\*[\s\S]*?\*\//g, "");
  const grab = (body) => {
    const map = {};
    const re = /--([\w-]+)\s*:\s*([^;]+);/g;
    let m;
    while ((m = re.exec(body))) map[m[1]] = m[2].trim().replace(/\s+/g, " ");
    return map;
  };
  const media = noComments.match(/@media\s*\(prefers-color-scheme:\s*dark\)\s*{\s*:root\s*{([\s\S]*?)}\s*}/);
  const mediaDark = media ? grab(media[1]) : {};
  const withoutMedia = noComments.replace(/@media[\s\S]*?{\s*:root[\s\S]*?}\s*}/, "");
  const dataDark = (withoutMedia.match(/\[data-theme="dark"\]\s*{([\s\S]*?)}/) || [, ""])[1];
  const root = (withoutMedia.match(/:root\s*{([\s\S]*?)}/) || [, ""])[1];
  return { root: grab(root), mediaDark, dataDark: grab(dataDark) };
}

function diffMaps(label, a, b) {
  const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
  const issues = [];
  for (const k of keys) {
    if (!(k in a)) issues.push(`  [${label}] +generated only: --${k} = ${b[k]}`);
    else if (!(k in b)) issues.push(`  [${label}] -production only: --${k} = ${a[k]}`);
    else if (a[k] !== b[k]) issues.push(`  [${label}] --${k}: prod="${a[k]}" gen="${b[k]}"`);
  }
  return issues;
}

function checkParity(generatedCss) {
  const prod = parseCssVars(readFileSync(PROD_CSS, "utf8"));
  const gen = parseCssVars(generatedCss);
  const issues = [
    ...diffMaps("root", prod.root, gen.root),
    ...diffMaps("dark", prod.dataDark, gen.dataDark),
    ...diffMaps("media-dark", prod.mediaDark, gen.mediaDark),
  ];
  const prodVarCount = Object.keys(prod.root).length + Object.keys(prod.dataDark).length;
  if (issues.length) {
    console.error(`✗ CSS parity FAILED (${issues.length} differences):`);
    console.error(issues.join("\n"));
    process.exit(1);
  }
  console.log(`✓ CSS parity OK — generated tokens.css value-identical to production (${prodVarCount} vars: ${Object.keys(prod.root).length} :root + ${Object.keys(prod.dataDark).length} dark).`);
}

/* --------------------------------- main ---------------------------------- */

const checkOnly = process.argv.includes("--check");
const css = buildCss();

if (!checkOnly) {
  mkdirSync(dirname(OUT_CSS), { recursive: true });
  writeFileSync(OUT_CSS, css);
  mkdirSync(dirname(OUT_KT), { recursive: true });
  writeFileSync(OUT_KT, buildKotlin());
  console.log(`✓ wrote ${OUT_CSS.replace(REPO + "/", "")}`);
  console.log(`✓ wrote ${OUT_KT.replace(REPO + "/", "")}`);
}
checkParity(css);
