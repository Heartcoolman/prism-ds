import { forwardRef } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../../lib/cx";
import "./Image.css";

export type ImageRatio = "16:9" | "4:3" | "1:1" | "3:4";

export interface ImageProps extends HTMLAttributes<HTMLDivElement> {
  /** Image source URL. Renders a placeholder glyph when omitted. */
  src?: string;
  /** Alternative text for the image. */
  alt?: string;
  /** Fixed aspect ratio of the box. */
  ratio?: ImageRatio;
  /** Corner radius (number = px, or any CSS length). */
  radius?: number | string;
  /** Bottom gradient scrim to keep overlaid text legible. */
  overlay?: boolean;
  /** Overlaid content (e.g. a caption), pinned bottom-left. */
  children?: ReactNode;
}

const RATIO_CSS: Record<ImageRatio, string> = {
  "16:9": "16 / 9",
  "4:3": "4 / 3",
  "1:1": "1 / 1",
  "3:4": "3 / 4",
};

/**
 * Media box. A fixed aspect-ratio container with a cover image, rounded
 * corners, and an optional gradient scrim for overlaid text. Falls back to a
 * muted placeholder glyph when no `src` is provided.
 */
export const Image = forwardRef<HTMLDivElement, ImageProps>(function Image(
  {
    src,
    alt = "",
    ratio = "16:9",
    radius,
    overlay = false,
    className,
    style,
    children,
    ...rest
  },
  ref
) {
  return (
    <div
      ref={ref}
      className={cx("prism-image", className)}
      style={{
        aspectRatio: RATIO_CSS[ratio],
        borderRadius:
          radius != null
            ? typeof radius === "number"
              ? `${radius}px`
              : radius
            : undefined,
        ...style,
      }}
      {...rest}
    >
      {src != null ? (
        <img className="prism-image__img" src={src} alt={alt} />
      ) : (
        <span className="prism-image__placeholder" aria-hidden="true">
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="9" cy="9" r="1.5" />
            <path d="m21 15-5-5L5 21" />
          </svg>
        </span>
      )}
      {overlay && <span className="prism-image__overlay" aria-hidden="true" />}
      {children != null && <div className="prism-image__content">{children}</div>}
    </div>
  );
});
