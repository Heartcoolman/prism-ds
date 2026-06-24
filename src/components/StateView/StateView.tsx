import { forwardRef } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../../lib/cx";
import { Icon } from "../Icon";
import { Spinner } from "../Spinner";
import "./StateView.css";

export type StateViewVariant = "empty" | "loading" | "error" | "success";

export interface StateViewProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** Page state. Drives the default icon, color, and aria role. */
  variant?: StateViewVariant;
  /** Custom glyph that overrides the variant default. */
  icon?: ReactNode;
  /** Primary message (headline). */
  title: ReactNode;
  /** Optional supporting text below the title. */
  description?: ReactNode;
  /** Optional action slot, typically a Button. */
  action?: ReactNode;
}

/** Variant-default glyph rendered inside the icon circle. */
function defaultIcon(variant: StateViewVariant): ReactNode {
  switch (variant) {
    case "loading":
      return <Spinner size="large" />;
    case "error":
      return <Icon name="warning" />;
    case "success":
      return <Icon name="check" />;
    case "empty":
    default:
      return <Icon name="folder" />;
  }
}

/**
 * Page-state pattern for empty / loading / error / success screens. A centered
 * column with an icon in a circle, a title, an optional description, and an
 * optional action. `loading`/`success` announce via `role="status"`, `error`
 * via `role="alert"`.
 */
export const StateView = forwardRef<HTMLDivElement, StateViewProps>(
  function StateView(
    { variant = "empty", icon, title, description, action, className, ...rest },
    ref
  ) {
    const role =
      variant === "error"
        ? "alert"
        : variant === "loading" || variant === "success"
          ? "status"
          : undefined;

    return (
      <div
        ref={ref}
        role={role}
        data-variant={variant}
        className={cx("ads-state", className)}
        {...rest}
      >
        <div className="ads-state__icon" aria-hidden="true">
          {icon ?? defaultIcon(variant)}
        </div>
        <div className="ads-state__title">{title}</div>
        {description != null && (
          <p className="ads-state__description">{description}</p>
        )}
        {action != null && <div className="ads-state__action">{action}</div>}
      </div>
    );
  }
);
