import { forwardRef, useId, useState } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../../lib/cx";
import "./Disclosure.css";

export interface DisclosureProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "title" | "onToggle"> {
  /** Summary row label shown beside the chevron. */
  title: ReactNode;
  /** Revealed content rendered below the summary when open. */
  children: ReactNode;
  /** Initial open state for uncontrolled usage. */
  defaultOpen?: boolean;
  /** Controlled open state; pair with `onToggle`. */
  open?: boolean;
  /** Called with the next open state when the summary is activated. */
  onToggle?: (open: boolean) => void;
}

/**
 * Disclosure (accordion). A summary row toggles a content region below it.
 * Works uncontrolled (`defaultOpen`) or controlled (`open` + `onToggle`).
 * The trailing chevron rotates 90deg when expanded.
 */
export const Disclosure = forwardRef<HTMLDivElement, DisclosureProps>(
  function Disclosure(
    { title, children, defaultOpen = false, open, onToggle, className, ...rest },
    ref
  ) {
    const reactId = useId();
    const regionId = `${reactId}-region`;
    const isControlled = open !== undefined;
    const [internalOpen, setInternalOpen] = useState(defaultOpen);
    const isOpen = isControlled ? open : internalOpen;

    const handleToggle = () => {
      const next = !isOpen;
      if (!isControlled) setInternalOpen(next);
      onToggle?.(next);
    };

    return (
      <div
        ref={ref}
        className={cx("ads-disclosure", isOpen && "ads-disclosure--open", className)}
        {...rest}
      >
        <button
          type="button"
          className="ads-disclosure__summary"
          aria-expanded={isOpen}
          aria-controls={regionId}
          onClick={handleToggle}
        >
          <span className="ads-disclosure__title">{title}</span>
          <span className="ads-disclosure__chevron" aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 6 6 6-6 6" />
            </svg>
          </span>
        </button>
        <div id={regionId} role="region" className="ads-disclosure__region" hidden={!isOpen}>
          <div className="ads-disclosure__content">{children}</div>
        </div>
      </div>
    );
  }
);
