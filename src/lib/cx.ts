export type ClassValue = string | false | null | undefined;

/** Minimal classnames joiner — filters falsy values. */
export function cx(...parts: ClassValue[]): string {
  return parts.filter(Boolean).join(" ");
}
