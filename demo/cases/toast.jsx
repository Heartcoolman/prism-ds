import { useState } from "react";
import { Toast, SegmentedControl } from "../../dist/index.js";

export default function Demo() {
  const [variant, setVariant] = useState("success");
  const messages = {
    neutral: "Link copied to clipboard",
    success: "Photo saved to Library",
    error: "Couldn't connect to server",
  };
  return (
    <div className="case">
      <div style={{ display: "flex", flexDirection: "column", gap: 14, alignItems: "center" }}>
        <SegmentedControl
          value={variant}
          onChange={setVariant}
          options={[
            { value: "neutral", label: "Neutral" },
            { value: "success", label: "Success" },
            { value: "error", label: "Error" },
          ]}
        />
        <Toast open variant={variant} message={messages[variant]} />
      </div>
    </div>
  );
}
