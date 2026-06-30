#!/usr/bin/env bash
# Cross-verification gate for the full prism-compose migration:
#   1. token single source  -> regenerate CSS + Kotlin, assert CSS value-parity with src/styles/tokens.css
#   2. icon set             -> regenerate from Icon/icons.ts
#   3. Gradle (desktop)     -> compile ALL modules (core/icons/charts/glass/ui/sample) + run all tests
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
export JAVA_HOME="${JAVA_HOME:-/opt/homebrew/opt/openjdk@17}"

echo "[1/3] token single-source -> CSS parity + Kotlin regen"
node "$HERE/tokens/build-tokens.mjs"

echo "[2/3] icon set regen (SVG path -> Kotlin)"
node "$HERE/prism-icons/build-icons.mjs"

echo "[3/4] Gradle (desktop): compile all modules + run tests"
"$HERE/gradlew" -p "$HERE" \
  compileKotlinDesktop \
  :prism-core:desktopTest :prism-icons:desktopTest \
  :sample:compileKotlinDesktop \
  --console=plain

echo "[4/4] Gradle (android): compile all 5 library modules for the Android target"
"$HERE/gradlew" -p "$HERE" \
  :prism-core:compileDebugKotlinAndroid \
  :prism-icons:compileDebugKotlinAndroid \
  :prism-charts:compileDebugKotlinAndroid \
  :prism-glass:compileDebugKotlinAndroid \
  :prism-ui:compileDebugKotlinAndroid \
  --console=plain

echo "✓ ALL VERIFICATION PASSED (desktop + android targets)"
