package io.github.heartcoolman.prism.icons

import androidx.compose.foundation.layout.size
import androidx.compose.material3.Icon
import androidx.compose.material3.LocalContentColor
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.SolidColor
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.StrokeJoin
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.graphics.vector.addPathNodes
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp

/**
 * Build an [ImageVector] from a built-in icon's raw SVG path. `strokeWidth`
 * is a real parameter (not baked away), mirroring the React `strokeWidth` prop.
 * The stroke color is a placeholder — the [PrismIcon] composable tints it.
 */
fun prismIconVector(name: String, strokeWidth: Float = 2f): ImageVector {
    val d = prismIconPaths[name] ?: error("unknown Prism icon: $name")
    return ImageVector.Builder(
        name = name,
        defaultWidth = 24.dp,
        defaultHeight = 24.dp,
        viewportWidth = 24f,
        viewportHeight = 24f,
    ).addPath(
        pathData = addPathNodes(d),
        fill = null,
        stroke = SolidColor(Color.Black),
        strokeLineWidth = strokeWidth,
        strokeLineCap = StrokeCap.Round,
        strokeLineJoin = StrokeJoin.Round,
    ).build()
}

/**
 * Render a built-in icon. Decorative by default (`contentDescription = null`);
 * pass a description to expose it to screen readers. Inherits content color.
 *
 *   PrismIcon(PrismIcons.Search, contentDescription = null, size = 18.dp)
 */
@Composable
fun PrismIcon(
    icon: ImageVector,
    contentDescription: String?,
    modifier: Modifier = Modifier,
    size: Dp = 24.dp,
    tint: Color = LocalContentColor.current,
) {
    Icon(
        imageVector = icon,
        contentDescription = contentDescription,
        modifier = modifier.size(size),
        tint = tint,
    )
}
