import { forwardRef } from "react";
import type { SVGAttributes } from "react";
import { cx } from "../../lib/cx";
import "./LineChart.css";

export interface LineChartProps
  extends Omit<SVGAttributes<SVGSVGElement>, "width" | "height"> {
  /** Series of y-values, plotted left→right at equal x-spacing. */
  data: number[];
  /** Intrinsic chart width in px (also the responsive max-width). */
  width?: number;
  /** Intrinsic chart height in px. */
  height?: number;
  /** Fill the region under the line with a fading accent gradient. */
  area?: boolean;
  /** Polyline stroke width in px. */
  strokeWidth?: number;
  /** Accessible description of the trend. */
  "aria-label"?: string;
}

const PAD = 6;

/**
 * Trend line chart rendered as inline SVG. Scales `data` into the viewport,
 * draws a rounded polyline in the accent color, and optionally fills the area
 * below it with a vertical accent→transparent gradient. The SVG is responsive
 * (100% width, capped at `width`).
 */
export const LineChart = forwardRef<SVGSVGElement, LineChartProps>(
  function LineChart(
    {
      data,
      width = 260,
      height = 96,
      area = false,
      strokeWidth = 2,
      className,
      style,
      "aria-label": ariaLabel = "趋势图",
      ...rest
    },
    ref
  ) {
    const n = data.length;
    const min = n > 0 ? Math.min(...data) : 0;
    const max = n > 0 ? Math.max(...data) : 0;
    const span = max - min || 1;
    const innerW = width - PAD * 2;
    const innerH = height - PAD * 2;
    const baseline = height - PAD;
    const gradientId = "ads-linechart-grad";

    const points = data.map((value, i) => {
      const x = n > 1 ? PAD + (innerW * i) / (n - 1) : width / 2;
      const y = PAD + innerH * (1 - (value - min) / span);
      return [x, y] as const;
    });

    const last = points[points.length - 1];
    const first = points[0];
    const polylinePoints = points.map(([x, y]) => `${x},${y}`).join(" ");
    const areaD =
      first && last
        ? `M ${first[0]} ${baseline} ` +
          points.map(([x, y]) => `L ${x} ${y}`).join(" ") +
          ` L ${last[0]} ${baseline} Z`
        : "";

    return (
      <svg
        ref={ref}
        role="img"
        aria-label={ariaLabel}
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        preserveAspectRatio="none"
        className={cx("ads-linechart", className)}
        style={{ maxWidth: width, ...style }}
        {...rest}
      >
        {area && (
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor="var(--color-accent)"
                stopOpacity={0.28}
              />
              <stop
                offset="100%"
                stopColor="var(--color-accent)"
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
        )}
        {area && areaD && (
          <path
            className="ads-linechart__area"
            d={areaD}
            fill={`url(#${gradientId})`}
            stroke="none"
          />
        )}
        {n > 0 && (
          <polyline
            className="ads-linechart__line"
            points={polylinePoints}
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
        {last && (
          <circle
            className="ads-linechart__dot"
            cx={last[0]}
            cy={last[1]}
            r={3}
            fill="var(--color-accent)"
          />
        )}
      </svg>
    );
  }
);
