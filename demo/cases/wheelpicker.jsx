import { useState } from "react";
import { WheelPicker } from "../../dist/index.js";

const HOURS = Array.from({ length: 12 }, (_, i) => {
  const h = String(i + 1).padStart(2, "0");
  return { label: h, value: h };
});
const MINUTES = ["00", "15", "30", "45"].map((m) => ({ label: m, value: m }));
const PERIODS = [
  { label: "AM", value: "AM" },
  { label: "PM", value: "PM" },
];

export default function Demo() {
  const [hour, setHour] = useState("09");
  const [minute, setMinute] = useState("30");
  const [period, setPeriod] = useState("AM");

  const handleChange = (columnIndex, value) => {
    if (columnIndex === 0) setHour(value);
    else if (columnIndex === 1) setMinute(value);
    else setPeriod(value);
  };

  return (
    <div className="case" style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
      <WheelPicker
        columns={[
          { key: "h", options: HOURS, value: hour },
          { key: "m", options: MINUTES, value: minute },
          { key: "p", options: PERIODS, value: period },
        ]}
        onChange={handleChange}
      />
      <div style={{ fontSize: 13, opacity: 0.6 }}>
        {hour}:{minute} {period}
      </div>
    </div>
  );
}
