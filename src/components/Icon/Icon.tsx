import { forwardRef } from "react";
import type { SVGProps } from "react";
import { icons } from "./icons";
import type { IconName } from "./icons";

export type { IconName };

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, "name"> {
  /** Icon name from the built-in set. */
  name: IconName;
  /** Square size in px. Default 24 (the keyline grid). */
  size?: number;
  /** Stroke width. Default 2. */
  strokeWidth?: number;
  /** Accessible label. When omitted the icon is decorative (`aria-hidden`). */
  "aria-label"?: string;
}

/**
 * Renders a glyph from the built-in icon set. Inherits `currentColor`, so set
 * color on the parent. Decorative by default; pass `aria-label` to expose it.
 */
export const Icon = forwardRef<SVGSVGElement, IconProps>(function Icon(
  { name, size = 24, strokeWidth = 2, ...rest },
  ref
) {
  const label = rest["aria-label"];
  return (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={label ? "img" : undefined}
      aria-hidden={label ? undefined : true}
      {...rest}
    >
      <path d={icons[name]} />
    </svg>
  );
});
