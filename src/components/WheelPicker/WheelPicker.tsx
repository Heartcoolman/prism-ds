import { forwardRef } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../../lib/cx";
import "./WheelPicker.css";

export interface WheelOption {
  /** Visible content for the row. */
  label: ReactNode;
  /** Stable value matched against the column's `value`. */
  value: string;
}

export interface WheelColumn {
  /** Optional React key / aria grouping id for the column. */
  key?: string;
  /** Ordered options shown in this column. */
  options: WheelOption[];
  /** Currently selected option value. */
  value: string;
}

export interface WheelPickerProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** One or more vertical columns, each with its own options and selection. */
  columns: WheelColumn[];
  /** Fires when a non-selected visible row is activated. */
  onChange?: (columnIndex: number, value: string) => void;
  /** Number of rows rendered per column (odd, default 5). */
  visibleCount?: number;
}

interface WheelRow {
  option: WheelOption | null;
  /** Distance from the center slot (0 = selected). */
  offset: number;
  /** Index into the column's options, or null for padding. */
  index: number | null;
}

/** Build the centered slice of rows around the selected index, padding edges. */
function buildRows(column: WheelColumn, visibleCount: number): WheelRow[] {
  const { options, value } = column;
  const half = Math.floor(visibleCount / 2);
  const selectedIndex = Math.max(
    0,
    options.findIndex((o) => o.value === value)
  );
  const rows: WheelRow[] = [];
  for (let offset = -half; offset <= half; offset += 1) {
    const index = selectedIndex + offset;
    const option = index >= 0 && index < options.length ? options[index] : null;
    rows.push({ option, offset, index: option ? index : null });
  }
  return rows;
}

/**
 * Drum/wheel selector for time or a short list of options. Renders one or more
 * vertical columns; in each column the selected option sits centered at full
 * opacity while neighbours fade above and below. A selection band marks the
 * center slot. Presentation is static — `visibleCount` rows are sliced around
 * the selected value with no scroll physics.
 */
export const WheelPicker = forwardRef<HTMLDivElement, WheelPickerProps>(
  function WheelPicker(
    { columns, onChange, visibleCount = 5, className, ...rest },
    ref
  ) {
    const count = visibleCount % 2 === 0 ? visibleCount + 1 : visibleCount;

    return (
      <div ref={ref} className={cx("prism-wheel", className)} {...rest}>
        {columns.map((column, columnIndex) => {
          const rows = buildRows(column, count);
          return (
            <div
              key={column.key ?? columnIndex}
              role="listbox"
              className="prism-wheel__column"
              style={{ height: `calc(36px * ${count})` }}
            >
              <div className="prism-wheel__band" aria-hidden="true" />
              {rows.map((row, rowIndex) => {
                const selected = row.offset === 0 && row.option != null;
                const distance = Math.min(Math.abs(row.offset), 2);
                if (row.option == null) {
                  return (
                    <div
                      key={`pad-${rowIndex}`}
                      className="prism-wheel__row prism-wheel__row--pad"
                      aria-hidden="true"
                    />
                  );
                }
                return (
                  <div
                    key={`opt-${row.index}`}
                    role="option"
                    aria-selected={selected}
                    data-distance={distance}
                    className={cx(
                      "prism-wheel__row",
                      selected && "prism-wheel__row--selected"
                    )}
                    onClick={
                      selected
                        ? undefined
                        : () => onChange?.(columnIndex, row.option!.value)
                    }
                  >
                    {row.option.label}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
);
