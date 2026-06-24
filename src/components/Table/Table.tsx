import { forwardRef } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../../lib/cx";
import "./Table.css";

export interface TableColumn {
  /** Row key used to look up the cell value. */
  key: string;
  /** Column heading content. */
  header: ReactNode;
  /** Text alignment for the column. Defaults to left, or right when numeric. */
  align?: "left" | "right";
  /** Render cells with tabular numerals and right alignment. */
  numeric?: boolean;
}

export interface TableProps extends HTMLAttributes<HTMLTableElement> {
  /** Column definitions, in display order. */
  columns: TableColumn[];
  /** Row data; each cell is looked up by its column key. */
  rows: Array<Record<string, ReactNode>>;
  /** Accessible table caption. */
  caption?: string;
}

/**
 * Data table. Footnote-weight headings over subhead body rows with hairline
 * separators. Numeric columns align right with tabular figures.
 */
export const Table = forwardRef<HTMLTableElement, TableProps>(function Table(
  { columns, rows, caption, className, ...rest },
  ref
) {
  return (
    <table ref={ref} className={cx("ads-table", className)} {...rest}>
      {caption != null && <caption className="ads-table__caption">{caption}</caption>}
      <thead className="ads-table__head">
        <tr className="ads-table__row">
          {columns.map((col) => {
            const align = col.align ?? (col.numeric ? "right" : "left");
            return (
              <th
                key={col.key}
                scope="col"
                data-align={align}
                data-numeric={col.numeric ? "true" : undefined}
                className="ads-table__th"
              >
                {col.header}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody className="ads-table__body">
        {rows.map((row, i) => (
          <tr key={i} className="ads-table__row">
            {columns.map((col) => {
              const align = col.align ?? (col.numeric ? "right" : "left");
              return (
                <td
                  key={col.key}
                  data-align={align}
                  data-numeric={col.numeric ? "true" : undefined}
                  className="ads-table__td"
                >
                  {row[col.key]}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
});
