import { forwardRef } from "react";
import type { HTMLAttributes } from "react";
import { cx } from "../../lib/cx";
import "./PageControl.css";

export interface PageControlProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** Total number of pages (dots). */
  count: number;
  /** Zero-based index of the current page. */
  index: number;
  /** When provided, dots become buttons that report the chosen index. */
  onChange?: (index: number) => void;
  /** Accessible label for the indicator. */
  "aria-label"?: string;
}

/**
 * Page dots indicator. A row of small circles where the active page
 * is highlighted with the accent color (rendered as a wider pill).
 * Interactive when `onChange` is supplied; otherwise purely decorative.
 */
export const PageControl = forwardRef<HTMLDivElement, PageControlProps>(
  function PageControl(
    {
      count,
      index,
      onChange,
      className,
      "aria-label": ariaLabel = "分页",
      ...rest
    },
    ref
  ) {
    const interactive = typeof onChange === "function";
    const dots = Array.from({ length: Math.max(0, count) }, (_, i) => i);

    return (
      <div
        ref={ref}
        role={interactive ? "tablist" : "group"}
        aria-label={ariaLabel}
        className={cx("ads-pagecontrol", className)}
        {...rest}
      >
        {dots.map((i) => {
          const current = i === index;
          const dotClass = cx(
            "ads-pagecontrol__dot",
            current && "ads-pagecontrol__dot--current"
          );

          if (interactive) {
            return (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={current}
                aria-label={`第 ${i + 1} 页`}
                className={cx(dotClass, "ads-pagecontrol__dot--button")}
                onClick={() => onChange?.(i)}
              >
                <span className="ads-pagecontrol__mark" aria-hidden="true" />
              </button>
            );
          }

          return <span key={i} className={dotClass} aria-hidden="true" />;
        })}
      </div>
    );
  }
);
