import { useState } from "react";
import { LineChart } from "../../dist/index.js";

const DATA = [12, 18, 9, 24, 16, 30, 22, 34, 28];

export default function Demo() {
  const [area, setArea] = useState(true);
  return (
    <div className="case">
      <div style={{ width: 280, display: "flex", flexDirection: "column", gap: 12 }}>
        <LineChart
          data={DATA}
          width={280}
          height={120}
          area={area}
          strokeWidth={2}
          aria-label="Sample trend"
        />
        <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}>
          <input
            type="checkbox"
            checked={area}
            onChange={(e) => setArea(e.target.checked)}
          />
          Fill area
        </label>
      </div>
    </div>
  );
}
