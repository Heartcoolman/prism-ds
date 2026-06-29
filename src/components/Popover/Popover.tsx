import { useEffect, useRef } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../../lib/cx";
import "./Popover.css";

export type PopoverPlacement = "top" | "bottom" | "left" | "right";

export interface PopoverProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "content"> {
  /** Whether the floating card is shown. */
  open: boolean;
  /** Called on outside click or Escape. */
  onClose?: () => void;
  /** Body rendered inside the floating card. */
  content: ReactNode;
  /** Side of the anchor the card sits on. */
  placement?: PopoverPlacement;
  /** The anchor element the card points at. */
  children: ReactNode;
}

/**
 * Anchored popover with a pointing arrow. The anchor stays in flow; the card
 * floats absolutely per `placement`. Outside click or Escape calls `onClose`.
 */
export function Popover({
  open,
  onClose,
  content,
  placement = "bottom",
  className,
  children,
  ...rest
}: PopoverProps) {
  const rootRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose?.();
    };
    const onPointerDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) onClose?.();
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onPointerDown);
    };
  }, [open, onClose]);

  return (
    <span className="prism-popover" ref={rootRef}>
      {children}
      {open && (
        <div
          role="dialog"
          className={cx("prism-popover__card", `prism-popover__card--${placement}`, className)}
          {...rest}
        >
          <span className="prism-popover__arrow" aria-hidden="true" />
          {content}
        </div>
      )}
    </span>
  );
}
