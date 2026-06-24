import { forwardRef } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../../lib/cx";
import "./List.css";

export interface ListProps extends HTMLAttributes<HTMLUListElement> {
  /** Inset the grouped container with horizontal margin. */
  inset?: boolean;
  children?: ReactNode;
}

export interface ListRowProps extends Omit<HTMLAttributes<HTMLLIElement>, "title"> {
  /** Leading slot — icon or avatar. */
  leading?: ReactNode;
  /** Primary text. */
  title: ReactNode;
  /** Secondary text below the title. */
  subtitle?: ReactNode;
  /** Trailing slot — value text or control. */
  trailing?: ReactNode;
  /** Show a trailing disclosure chevron. */
  chevron?: boolean;
}

/**
 * Grouped list container. Renders a `role="list"` of `ListRow` children
 * separated by hairline rules, with continuous card radius.
 */
export const List = forwardRef<HTMLUListElement, ListProps>(function List(
  { inset = false, className, children, ...rest },
  ref
) {
  return (
    <ul
      ref={ref}
      role="list"
      className={cx("ads-list", inset && "ads-list--inset", className)}
      {...rest}
    >
      {children}
    </ul>
  );
});

/**
 * A single list row. Becomes interactive (hover, pointer, `role="button"`)
 * when an `onClick` handler is provided. Minimum 44px touch target.
 */
export const ListRow = forwardRef<HTMLLIElement, ListRowProps>(function ListRow(
  { leading, title, subtitle, trailing, chevron = false, className, onClick, ...rest },
  ref
) {
  const interactive = onClick != null;
  return (
    <li
      ref={ref}
      onClick={onClick}
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      className={cx("ads-list__row", interactive && "ads-list__row--interactive", className)}
      {...rest}
    >
      {leading != null && (
        <span className="ads-list__leading" aria-hidden="true">
          {leading}
        </span>
      )}
      <span className="ads-list__main">
        <span className="ads-list__title">{title}</span>
        {subtitle != null && <span className="ads-list__subtitle">{subtitle}</span>}
      </span>
      {trailing != null && <span className="ads-list__trailing">{trailing}</span>}
      {chevron && (
        <svg
          className="ads-list__chevron"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m9 6 6 6-6 6" />
        </svg>
      )}
    </li>
  );
});
