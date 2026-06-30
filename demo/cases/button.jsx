import { useState } from "react";
import { Button } from "../../dist/index.js";

export default function Demo() {
  const [count, setCount] = useState(0);
  return (
    <div className="case">
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
        <Button variant="filled" onClick={() => setCount((c) => c + 1)}>
          Tapped {count}
        </Button>
        <Button variant="tinted">Tinted</Button>
        <Button variant="gray">Gray</Button>
        <Button variant="bordered">Bordered</Button>
        <Button variant="plain">Plain</Button>
      </div>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center", marginTop: 12 }}>
        <Button size="small" tone="danger" variant="tinted">Danger</Button>
        <Button size="small" tone="success" variant="tinted">Success</Button>
        <Button size="small" disabled>Disabled</Button>
      </div>
    </div>
  );
}
