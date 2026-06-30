import { useState } from "react";
import { Badge, Button } from "../../dist/index.js";

export default function Demo() {
  const [count, setCount] = useState(3);
  return (
    <div className="case">
      <div style={{ display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
        <Badge count={count} tone="danger">
          <span style={{ fontSize: 28 }} aria-hidden="true">🔔</span>
        </Badge>
        <Badge dot tone="accent">
          <span style={{ fontSize: 28 }} aria-hidden="true">✉️</span>
        </Badge>
        <Badge count={120} max={99} tone="gray">
          <span style={{ fontSize: 28 }} aria-hidden="true">📥</span>
        </Badge>
      </div>
      <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 14 }}>
        <Button size="small" variant="gray" onClick={() => setCount((c) => Math.max(0, c - 1))}>−</Button>
        <Badge count={count} tone="accent" />
        <Button size="small" variant="gray" onClick={() => setCount((c) => c + 1)}>+</Button>
      </div>
    </div>
  );
}
