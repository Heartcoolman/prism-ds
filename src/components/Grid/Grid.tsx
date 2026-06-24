import { forwardRef } from "react";
import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { cx } from "../../lib/cx";
import "./Grid.css";

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  /** Fixed column count. When omitted, the grid is responsive (4 / 8 / 12). */
  columns?: number;
  /** Gap between cells. Number is treated as px; default `var(--s-5)` (24). */
  gap?: number | string;
  children?: ReactNode;
}

/**
 * Responsive layout grid. Without `columns` it adapts to the viewport
 * (4 columns, 8 at >=600px, 12 at >=1024px). With `columns` it renders
 * exactly that many equal-width tracks.
 */
export const Grid = forwardRef<HTMLDivElement, GridProps>(function Grid(
  { columns, gap, className, style, children, ...rest },
  ref
) {
  const vars: CSSProperties = {
    ...(columns != null ? { "--ads-grid-cols": columns } : {}),
    ...(gap != null
      ? { gap: typeof gap === "number" ? `${gap}px` : gap }
      : {}),
  } as CSSProperties;

  return (
    <div
      ref={ref}
      data-cols={columns != null ? columns : undefined}
      className={cx("ads-grid", className)}
      style={{ ...vars, ...style }}
      {...rest}
    >
      {children}
    </div>
  );
});
