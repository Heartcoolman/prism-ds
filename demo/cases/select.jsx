import { useState } from "react";
import { Select } from "../../dist/index.js";

export default function Demo() {
  const [fruit, setFruit] = useState("apple");
  const [size, setSize] = useState("");
  return (
    <div className="case">
      <Select
        label="Fruit"
        helpText="Pick your favorite"
        value={fruit}
        onChange={(e) => setFruit(e.target.value)}
      >
        <option value="apple">Apple</option>
        <option value="orange">Orange</option>
        <option value="peach">Peach</option>
      </Select>
      <div style={{ marginTop: 12 }}>
        <Select
          label="Size"
          error={size === "" ? "Selection required" : undefined}
          value={size}
          onChange={(e) => setSize(e.target.value)}
        >
          <option value="">Choose…</option>
          <option value="s">Small</option>
          <option value="m">Medium</option>
          <option value="l">Large</option>
        </Select>
      </div>
    </div>
  );
}
