import { forwardRef } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../../lib/cx";
import "./Material.css";

export type MaterialThickness = "ultraThin" | "thin" | "regular" | "thick";

export interface MaterialProps extends HTMLAttributes<HTMLDivElement> {
  /** Blur strength; thickens with elevation (nav < popover < sheet). */
  thickness?: MaterialThickness;
  /** Progressive blur: the blur ramps to clear along the bottom edge — used for bars that dissolve content rather than ending on a hard line. */
  progressive?: boolean;
  children?: ReactNode;
}

/**
 * Translucent frosted-glass surface (backdrop blur + saturate). Sits over
 * content and lets it show through, layered but never opaque. Use for floating
 * chrome — nav bars, popovers, bottom sheets.
 */
export const Material = forwardRef<HTMLDivElement, MaterialProps>(function Material(
  { thickness = "regular", progressive = false, className, children, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      className={cx(
        "prism-material",
        `prism-material--${thickness}`,
        progressive && "prism-material--progressive",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
});
