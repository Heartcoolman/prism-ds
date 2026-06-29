import { forwardRef } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../../lib/cx";
import "./Breadcrumb.css";

export interface BreadcrumbItem {
  /** Visible label for the crumb. */
  label: ReactNode;
  /** Optional link target for non-last items. */
  href?: string;
}

export interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {
  /** Ordered trail from root to current page. The last item is the current page. */
  items: BreadcrumbItem[];
  /** Render crumbs as buttons and report navigation by index (overrides href). */
  onNavigate?: (index: number) => void;
}

const ChevronIcon = () => (
  <svg
    className="prism-breadcrumb__chevron"
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
);

/**
 * Breadcrumb trail showing the path to the current page. Non-last items are
 * links (or buttons when `onNavigate` is set); the last item is the current
 * page, marked `aria-current="page"`.
 */
export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(
  function Breadcrumb({ items, onNavigate, className, ...rest }, ref) {
    return (
      <nav
        ref={ref}
        aria-label="面包屑"
        className={cx("prism-breadcrumb", className)}
        {...rest}
      >
        <ol className="prism-breadcrumb__list">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li className="prism-breadcrumb__item" key={index}>
                {isLast ? (
                  <span className="prism-breadcrumb__current" aria-current="page">
                    {item.label}
                  </span>
                ) : onNavigate != null ? (
                  <button
                    type="button"
                    className="prism-breadcrumb__link"
                    onClick={() => onNavigate(index)}
                  >
                    {item.label}
                  </button>
                ) : (
                  <a className="prism-breadcrumb__link" href={item.href}>
                    {item.label}
                  </a>
                )}
                {!isLast && <ChevronIcon />}
              </li>
            );
          })}
        </ol>
      </nav>
    );
  }
);
