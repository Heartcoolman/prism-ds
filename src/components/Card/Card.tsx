import { forwardRef } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../../lib/cx";
import "./Card.css";

export interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** Top media slot (e.g. 16:9 image). Renders a placeholder when omitted. */
  media?: ReactNode;
  /** Uppercase overline above the title (category/section label). */
  eyebrow?: ReactNode;
  /** Prominent card title. */
  title?: ReactNode;
  /** Supporting one-to-two line description. */
  description?: ReactNode;
  /** Footer slot for actions or links. */
  footer?: ReactNode;
  /** Add pointer affordance + hover lift for clickable cards. */
  interactive?: boolean;
  children?: ReactNode;
}

/**
 * Content card. A neutral surface with optional top media, an eyebrow/title/
 * description text block, free-form body, and an optional footer. Set
 * `interactive` for clickable cards that lift on hover.
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  {
    media,
    eyebrow,
    title,
    description,
    footer,
    interactive = false,
    className,
    children,
    ...rest
  },
  ref
) {
  const hasText = eyebrow != null || title != null || description != null;
  const hasBody = hasText || children != null || footer != null;

  return (
    <div
      ref={ref}
      className={cx("ads-card", interactive && "ads-card--interactive", className)}
      {...rest}
    >
      <div className="ads-card__media" aria-hidden={media == null ? true : undefined}>
        {media != null ? media : <div className="ads-card__media-placeholder" />}
      </div>
      {hasBody && (
        <div className="ads-card__body">
          {eyebrow != null && <div className="ads-card__eyebrow">{eyebrow}</div>}
          {title != null && <div className="ads-card__title">{title}</div>}
          {description != null && (
            <p className="ads-card__description">{description}</p>
          )}
          {children}
          {footer != null && <div className="ads-card__footer">{footer}</div>}
        </div>
      )}
    </div>
  );
});
