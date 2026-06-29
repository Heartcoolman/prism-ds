import { forwardRef } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../../lib/cx";
import "./TabBar.css";

export interface TabBarItem {
  /** Stable identifier matched against `value`. */
  key: string;
  /** Visible text under the icon. */
  label: ReactNode;
  /** Glyph rendered in a 24px box. */
  icon: ReactNode;
}

export interface TabBarProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** Tab definitions, left to right. */
  items: TabBarItem[];
  /** `key` of the currently selected tab. */
  value: string;
  /** Fires with the selected tab's `key`. */
  onChange: (key: string) => void;
}

/**
 * Bottom tab bar. Translucent material background with a hairline top
 * separator; each tab stacks a 24px icon over a footnote label. The
 * selected tab uses the accent color, the rest are tertiary.
 */
export const TabBar = forwardRef<HTMLDivElement, TabBarProps>(function TabBar(
  { items, value, onChange, className, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      role="tablist"
      className={cx("prism-tabbar", className)}
      {...rest}
    >
      {items.map((item) => {
        const selected = item.key === value;
        return (
          <button
            key={item.key}
            type="button"
            role="tab"
            aria-selected={selected}
            aria-label={typeof item.label === "string" ? item.label : item.key}
            className={cx(
              "prism-tabbar__tab",
              selected && "prism-tabbar__tab--selected"
            )}
            onClick={() => onChange(item.key)}
          >
            <span className="prism-tabbar__icon" aria-hidden="true">
              {item.icon}
            </span>
            <span className="prism-tabbar__label">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
});
