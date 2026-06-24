import { forwardRef } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import { Children, isValidElement } from "react";
import { cx } from "../../lib/cx";
import "./Avatar.css";

export type AvatarSize = "small" | "medium" | "large";
export type AvatarStatus = "online" | "none";

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  /** Image URL. When set, renders a cover-fit photo. */
  src?: string;
  /** Display name; first 1-2 chars become the initials fallback. */
  name?: string;
  /** Diameter: small 28 / medium 40 / large 56. */
  size?: AvatarSize;
  /** Presence dot, bottom-right. `online` shows a success dot. */
  status?: AvatarStatus;
}

/** First 1-2 characters of a name, uppercased. */
function initialsOf(name: string): string {
  return Array.from(name.trim()).slice(0, 2).join("").toUpperCase();
}

/**
 * Circular avatar. Shows a cover-fit photo when `src` is set,
 * otherwise centered initials on a neutral fill. Optional presence dot.
 */
export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
  { src, name = "", size = "medium", status = "none", className, ...rest },
  ref
) {
  const initials = initialsOf(name);
  return (
    <span
      ref={ref}
      className={cx("ads-avatar", `ads-avatar--${size}`, className)}
      role="img"
      aria-label={name || undefined}
      {...rest}
    >
      {src != null ? (
        <img className="ads-avatar__img" src={src} alt={name} />
      ) : (
        <span className="ads-avatar__initials" aria-hidden="true">
          {initials}
        </span>
      )}
      {status === "online" && (
        <span className="ads-avatar__status" aria-hidden="true" />
      )}
    </span>
  );
});

export interface AvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
  /** Avatars to stack, overlapping left-to-right. */
  children: ReactNode;
  /** Show the first N avatars, then a "+K" overflow chip. */
  max?: number;
}

/**
 * Overlapping stack of avatars. Beyond `max`, collapses the remainder
 * into a trailing "+K" avatar.
 */
export const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
  function AvatarGroup({ children, max, className, ...rest }, ref) {
    const items = Children.toArray(children).filter(isValidElement);
    const limit = max != null && max < items.length ? max : items.length;
    const shown = items.slice(0, limit);
    const overflow = items.length - shown.length;

    return (
      <div ref={ref} className={cx("ads-avatar-group", className)} {...rest}>
        {shown.map((child, i) => (
          <span className="ads-avatar-group__item" key={i}>
            {child}
          </span>
        ))}
        {overflow > 0 && (
          <span className="ads-avatar-group__item">
            <span
              className="ads-avatar ads-avatar--medium ads-avatar-group__more"
              role="img"
              aria-label={`其余 ${overflow} 人`}
            >
              <span className="ads-avatar__initials" aria-hidden="true">
                +{overflow}
              </span>
            </span>
          </span>
        )}
      </div>
    );
  }
);
