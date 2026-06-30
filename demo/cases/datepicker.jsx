import { useState } from "react";
import { DatePicker } from "../../dist/index.js";

export default function Demo() {
  const [date, setDate] = useState(new Date());

  return (
    <div className="case" style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
      <DatePicker value={date} onChange={setDate} />
      <div style={{ fontSize: 13, opacity: 0.6 }}>
        {date ? date.toLocaleDateString() : "No date selected"}
      </div>
    </div>
  );
}
