package io.github.heartcoolman.prism.icons

import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertTrue

class IconTest {

    @Test
    fun iconSetIsComplete() {
        // Ported from Icon/icons.ts — the full built-in set.
        assertTrue(prismIconPaths.size >= 46, "expected the full icon set, got ${prismIconPaths.size}")
    }

    @Test
    fun knownIconPathMatchesSource() {
        assertEquals("M12 19V5M5 12l7-7 7 7", prismIconPaths["arrowUp"])
    }

    @Test
    fun vectorBuildsWithRuntimeStroke() {
        // strokeWidth is a real parameter (not baked away) — §4 v2 fix.
        val v = prismIconVector("search", strokeWidth = 1.5f)
        assertEquals("search", v.name)
    }

    @Test
    fun unknownIconFailsLoudly() {
        var threw = false
        try {
            prismIconVector("definitely-not-an-icon")
        } catch (e: IllegalStateException) {
            threw = true
        }
        assertTrue(threw)
    }
}
