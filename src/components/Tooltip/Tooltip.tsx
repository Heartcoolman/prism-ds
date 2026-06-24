import { forwardRef, useId } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../../lib/cx";
import "./Tooltip.css";

export type TooltipPlacement = "top" | "bottom" | "left" | "right";

export interface TooltipProps extends HTMLAttributes<HTMLSpanElement> {
  /** Bubble content shown on hover/focus. */
  label: ReactNode;
  /** Bubble side relative to the trigger. */
  placement?: TooltipPlacement;
  /** Force the bubble visible (e.g. for stories/screenshots). */
  open?: boolean;
  /** The trigger element the tooltip describes. */
  children: ReactNode;
}

/**
 * Hover/focus tooltip. Wraps children in an inline relative span and reveals a
 * small bubble via CSS :hover/:focus-within; `open` forces it visible.
 * The trigger is linked to the bubble through aria-describedby.
 */
export const Tooltip = forwardRef<HTMLSpanElement, TooltipProps>(function Tooltip(
  { label, placement = "top", open = false, className, children, ...rest },
  ref
) {
  const bubbleId = useId();

  return (
    <span
      ref={ref}
      className={cx(
        "ads-tooltip",
        `ads-tooltip--${placement}`,
        open && "ads-tooltip--open",
        className
      )}
      {...rest}
    >
      <span className="ads-tooltip__trigger" aria-describedby={bubbleId}>
        {children}
      </span>
      <span id={bubbleId} role="tooltip" className="ads-tooltip__bubble">
        {label}
        <span className="ads-tooltip__arrow" aria-hidden="true" />
      </span>
    </span>
  );
});
