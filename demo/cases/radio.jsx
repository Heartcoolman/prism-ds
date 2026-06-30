import { useState } from "react";
import { RadioGroup } from "../../dist/index.js";

export default function Demo() {
  const [plan, setPlan] = useState("pro");
  const [layout, setLayout] = useState("grid");
  return (
    <div className="case">
      <RadioGroup
        name="plan"
        aria-label="Plan"
        value={plan}
        onChange={setPlan}
        options={[
          { label: "Free", value: "free" },
          { label: "Pro", value: "pro" },
          { label: "Team (soon)", value: "team", disabled: true },
        ]}
      />
      <div style={{ marginTop: 14 }}>
        <RadioGroup
          name="layout"
          aria-label="Layout"
          orientation="horizontal"
          value={layout}
          onChange={setLayout}
          options={[
            { label: "Grid", value: "grid" },
            { label: "List", value: "list" },
          ]}
        />
      </div>
    </div>
  );
}
