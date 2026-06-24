import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";
import { cx } from "../../lib/cx";
import "./SearchField.css";

export interface SearchFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Called when the trailing clear (×) button is pressed. */
  onClear?: () => void;
  /** Stretch to fill the container width. */
  fullWidth?: boolean;
}

/**
 * Filled search input with a leading magnifier and a trailing clear button
 * that appears only when a value is present. Background is a tertiary fill;
 * the input itself is transparent and borderless.
 */
export const SearchField = forwardRef<HTMLInputElement, SearchFieldProps>(
  function SearchField(
    {
      onClear,
      fullWidth = false,
      value,
      placeholder = "搜索",
      className,
      ...rest
    },
    ref
  ) {
    const hasValue = value != null && value !== "";

    return (
      <div
        role="search"
        className={cx("ads-search", fullWidth && "ads-search--full", className)}
      >
        <span className="ads-search__icon" aria-hidden="true">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
        </span>
        <input
          ref={ref}
          type="search"
          aria-label="搜索"
          className="ads-search__input"
          placeholder={placeholder}
          value={value}
          {...rest}
        />
        {hasValue && (
          <button
            type="button"
            className="ads-search__clear"
            aria-label="清除"
            onClick={onClear}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M6 6 18 18M18 6 6 18" />
            </svg>
          </button>
        )}
      </div>
    );
  }
);
