import { forwardRef } from "react";
import type { HTMLAttributes, ReactNode, KeyboardEvent } from "react";
import { cx } from "../../lib/cx";
import "./Tabs.css";

export interface TabItem {
  /** Stable identifier emitted by `onChange`. */
  key: string;
  /** Visible tab content. */
  label: ReactNode;
}

export interface TabsProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** Tab descriptors, rendered left to right. */
  tabs: TabItem[];
  /** Key of the currently selected tab (controlled). */
  value: string;
  /** Fires with the selected tab's key on activation. */
  onChange: (key: string) => void;
  /** Stretch tabs to share the full row width equally. */
  fullWidth?: boolean;
}

/**
 * Underline tabs. A row of tab buttons over a 1px separator track; the active
 * tab is emphasized (weight 600) with a 2px accent underline bar. Controlled.
 * ArrowLeft/ArrowRight move selection between tabs.
 */
export const Tabs = forwardRef<HTMLDivElement, TabsProps>(function Tabs(
  { tabs, value, onChange, fullWidth = false, className, ...rest },
  ref
) {
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    const index = tabs.findIndex((t) => t.key === value);
    if (index === -1) return;
    e.preventDefault();
    const delta = e.key === "ArrowRight" ? 1 : -1;
    const next = (index + delta + tabs.length) % tabs.length;
    onChange(tabs[next].key);
  };

  return (
    <div
      ref={ref}
      role="tablist"
      onKeyDown={onKeyDown}
      className={cx("prism-tabs", fullWidth && "prism-tabs--full", className)}
      {...rest}
    >
      {tabs.map((tab) => {
        const selected = tab.key === value;
        return (
          <button
            key={tab.key}
            type="button"
            role="tab"
            aria-selected={selected}
            tabIndex={selected ? 0 : -1}
            className={cx("prism-tabs__tab", selected && "prism-tabs__tab--active")}
            onClick={() => onChange(tab.key)}
          >
            <span className="prism-tabs__label">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
});
