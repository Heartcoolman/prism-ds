import { useState } from "react";
import { Stepper } from "../../dist/index.js";

export default function Demo() {
  const [qty, setQty] = useState(2);
  const [guests, setGuests] = useState(4);

  return (
    <div className="case" style={{ display: "flex", flexDirection: "column", gap: 20, alignItems: "flex-start" }}>
      <label style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ width: 80 }}>Quantity</span>
        <Stepper value={qty} onChange={setQty} min={0} max={10} />
        <span style={{ opacity: 0.6 }}>{qty}</span>
      </label>

      <label style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ width: 80 }}>Guests</span>
        <Stepper value={guests} onChange={setGuests} min={1} max={8} step={1} />
      </label>

      <label style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ width: 80 }}>Disabled</span>
        <Stepper value={3} onChange={() => {}} disabled />
      </label>
    </div>
  );
}
