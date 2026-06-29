import { forwardRef, useState } from "react";
import type { HTMLAttributes } from "react";
import { cx } from "../../lib/cx";
import "./DatePicker.css";

const WEEKDAYS = ["日", "一", "二", "三", "四", "五", "六"] as const;

export interface DatePickerProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** Currently selected date, or null when nothing is selected. */
  value?: Date | null;
  /** Fired with the clicked day. */
  onChange?: (date: Date) => void;
  /** Month shown on first render (any day within it). Falls back to `value`, then today. */
  defaultMonth?: Date;
}

function startOfMonth(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

/**
 * Calendar date picker. Self-contained month grid built on the native `Date`
 * API — no date libraries. The displayed month is controlled internally and
 * seeded from `defaultMonth`, then `value`, then today.
 */
export const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
  function DatePicker({ value, onChange, defaultMonth, className, ...rest }, ref) {
    const seed = defaultMonth ?? value ?? new Date();
    const [displayed, setDisplayed] = useState<Date>(() => startOfMonth(seed));

    const today = new Date();
    const year = displayed.getFullYear();
    const month = displayed.getMonth();

    const firstWeekday = new Date(year, month, 1).getDay();
    const gridStart = new Date(year, month, 1 - firstWeekday);

    const days: Date[] = [];
    for (let i = 0; i < 42; i += 1) {
      days.push(new Date(gridStart.getFullYear(), gridStart.getMonth(), gridStart.getDate() + i));
    }

    const goTo = (delta: number) => {
      setDisplayed(new Date(year, month + delta, 1));
    };

    const label = `${year} 年 ${month + 1} 月`;

    return (
      <div
        ref={ref}
        className={cx("prism-datepicker", className)}
        role="group"
        aria-label={label}
        {...rest}
      >
        <div className="prism-datepicker__header">
          <button
            type="button"
            className="prism-datepicker__nav"
            aria-label="上个月"
            onClick={() => goTo(-1)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <span className="prism-datepicker__title">{label}</span>
          <button
            type="button"
            className="prism-datepicker__nav"
            aria-label="下个月"
            onClick={() => goTo(1)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>

        <div className="prism-datepicker__weekdays" aria-hidden="true">
          {WEEKDAYS.map((w) => (
            <span key={w} className="prism-datepicker__weekday">
              {w}
            </span>
          ))}
        </div>

        <div className="prism-datepicker__grid" role="grid">
          {days.map((day) => {
            const outside = day.getMonth() !== month;
            const selected = value != null && isSameDay(day, value);
            const isToday = isSameDay(day, today);
            return (
              <button
                key={day.toISOString()}
                type="button"
                role="gridcell"
                aria-selected={selected}
                className={cx(
                  "prism-datepicker__day",
                  outside && "prism-datepicker__day--outside",
                  selected && "prism-datepicker__day--selected",
                  !selected && isToday && "prism-datepicker__day--today"
                )}
                onClick={() => onChange?.(day)}
              >
                {day.getDate()}
              </button>
            );
          })}
        </div>
      </div>
    );
  }
);
