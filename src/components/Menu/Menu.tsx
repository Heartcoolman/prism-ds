import { forwardRef } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../../lib/cx";
import "./Menu.css";

/** A single selectable row in a {@link Menu}. */
export interface MenuItem {
  /** Row content. */
  label: ReactNode;
  /** Optional leading glyph (18px box, secondary tint). */
  icon?: ReactNode;
  /** Render in the destructive color. */
  danger?: boolean;
  /** Block interaction and dim the row. */
  disabled?: boolean;
  /** Invoked when the row is chosen. */
  onSelect?: () => void;
}

/** Either a selectable row or a thin divider line. */
export type MenuEntry = MenuItem | "separator";

export interface MenuProps extends HTMLAttributes<HTMLDivElement> {
  /** Rows and separators, top to bottom. */
  items: MenuEntry[];
  /** Visibility. Renders `null` when false. */
  open?: boolean;
  /** Called after an item is selected (request to dismiss). */
  onClose?: () => void;
}

function isSeparator(entry: MenuEntry): entry is "separator" {
  return entry === "separator";
}

/**
 * Dropdown / context menu card. A floating surface of rows with optional
 * leading icons, danger styling and separators. Controlled via `open`;
 * renders inline (no portal) and returns `null` when closed.
 */
export const Menu = forwardRef<HTMLDivElement, MenuProps>(function Menu(
  { items, open = true, onClose, className, ...rest },
  ref
) {
  if (!open) return null;

  return (
    <div
      ref={ref}
      role="menu"
      className={cx("ads-menu", className)}
      {...rest}
    >
      {items.map((entry, i) => {
        if (isSeparator(entry)) {
          return <div key={i} className="ads-menu__separator" role="separator" />;
        }

        const { label, icon, danger, disabled, onSelect } = entry;
        return (
          <button
            key={i}
            type="button"
            role="menuitem"
            disabled={disabled}
            className={cx("ads-menu__item", danger && "ads-menu__item--danger")}
            onClick={() => {
              onSelect?.();
              onClose?.();
            }}
          >
            {icon != null && (
              <span className="ads-menu__icon" aria-hidden="true">
                {icon}
              </span>
            )}
            <span className="ads-menu__label">{label}</span>
          </button>
        );
      })}
    </div>
  );
});
