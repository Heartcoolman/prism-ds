import { useState } from "react";
import { PageControl } from "../../dist/index.js";

export default function Demo() {
  const [index, setIndex] = useState(0);
  const count = 5;
  return (
    <div className="case">
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
        <div style={{ fontSize: 14, opacity: 0.7 }}>
          Page {index + 1} of {count}
        </div>
        <PageControl count={count} index={index} onChange={setIndex} />
      </div>
    </div>
  );
}
