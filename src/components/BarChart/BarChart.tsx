import { forwardRef } from "react";
import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { cx } from "../../lib/cx";
import "./BarChart.css";

export interface BarChartDatum {
  /** Caption rendered under the bar. */
  label: ReactNode;
  /** Magnitude; bar height is proportional to the series max. */
  value: number;
}

export interface BarChartProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "aria-label"> {
  /** Series to plot, left to right. */
  data: BarChartDatum[];
  /** Index of the accented bar. Defaults to the max-value bar. */
  highlightIndex?: number;
  /** Plot height in px (excludes labels/values). */
  height?: number;
  /** Render the value above the highlighted bar. */
  showValues?: boolean;
  /** Accessible summary of the series; auto-generated when omitted. */
  "aria-label"?: string;
}

/**
 * Restrained vertical bar chart. Bars share the available width, rise
 * proportionally to the series max, and use a single accent to mark one
 * bar (the max by default). No axes or gridlines.
 */
export const BarChart = forwardRef<HTMLDivElement, BarChartProps>(
  function BarChart(
    {
      data,
      highlightIndex,
      height = 160,
      showValues = false,
      className,
      style,
      "aria-label": ariaLabel,
      ...rest
    },
    ref
  ) {
    const values = data.map((d) => d.value);
    const max = values.length > 0 ? Math.max(...values) : 0;
    const maxIndex = values.indexOf(max);
    const accentIndex = highlightIndex ?? maxIndex;

    const summary =
      ariaLabel ??
      `柱状图，共 ${data.length} 项，最大值 ${max}` +
        (data[accentIndex] != null
          ? `，突出显示第 ${accentIndex + 1} 项`
          : "");

    const vars = { "--_h": `${height}px` } as CSSProperties;

    return (
      <div
        ref={ref}
        role="img"
        aria-label={summary}
        className={cx("ads-barchart", className)}
        style={{ ...vars, ...style }}
        {...rest}
      >
        {data.map((d, i) => {
          const pct = max > 0 ? (d.value / max) * 100 : 0;
          const highlighted = i === accentIndex;
          return (
            <div className="ads-barchart__col" key={i}>
              <div className="ads-barchart__plot">
                <div
                  className={cx(
                    "ads-barchart__bar",
                    highlighted && "ads-barchart__bar--highlight"
                  )}
                  style={{ height: `${pct}%` }}
                >
                  {showValues && highlighted && (
                    <span className="ads-barchart__value">{d.value}</span>
                  )}
                </div>
              </div>
              <div className="ads-barchart__label">{d.label}</div>
            </div>
          );
        })}
      </div>
    );
  }
);
