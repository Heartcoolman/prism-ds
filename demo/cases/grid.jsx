import { useState } from "react";
import { Grid } from "../../dist/index.js";

export default function Demo() {
  const [columns, setColumns] = useState(3);
  const cells = Array.from({ length: 6 }, (_, i) => i + 1);
  return (
    <div className="case">
      <div style={{ display: "flex", flexDirection: "column", gap: 12, width: 300 }}>
        <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}>
          Columns: {columns}
          <input
            type="range"
            min={1}
            max={6}
            value={columns}
            onChange={(e) => setColumns(Number(e.target.value))}
            aria-label="Grid columns"
            style={{ flex: 1 }}
          />
        </label>
        <Grid columns={columns} gap={8}>
          {cells.map((n) => (
            <div
              key={n}
              style={{
                background: "var(--color-accent, #0a84ff)",
                color: "#fff",
                borderRadius: 8,
                padding: "14px 0",
                textAlign: "center",
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              {n}
            </div>
          ))}
        </Grid>
      </div>
    </div>
  );
}
