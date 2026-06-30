import { useState } from "react";
import { Textarea } from "../../dist/index.js";

export default function Demo() {
  const [text, setText] = useState("");
  const max = 120;
  const over = text.length > max;
  return (
    <div className="case">
      <div style={{ width: 300 }}>
        <Textarea
          label="Feedback"
          placeholder="Tell us what you think…"
          rows={3}
          value={text}
          onChange={(e) => setText(e.target.value)}
          helpText={`${text.length}/${max} characters`}
          error={over ? `Please keep it under ${max} characters.` : undefined}
          fullWidth
        />
      </div>
    </div>
  );
}
