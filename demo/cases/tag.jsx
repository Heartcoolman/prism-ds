import { useState } from "react";
import { Tag } from "../../dist/index.js";

export default function Demo() {
  const [selected, setSelected] = useState("All");
  const [tokens, setTokens] = useState(["Design", "Swift", "React"]);
  const filters = ["All", "Photos", "Videos"];
  return (
    <div className="case">
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {filters.map((f) => (
          <Tag
            key={f}
            tone="accent"
            selected={selected === f}
            onClick={() => setSelected(f)}
          >
            {f}
          </Tag>
        ))}
      </div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 12 }}>
        {tokens.map((t) => (
          <Tag
            key={t}
            tone="gray"
            onRemove={() => setTokens((ts) => ts.filter((x) => x !== t))}
          >
            {t}
          </Tag>
        ))}
        <Tag tone="success">Success</Tag>
        <Tag tone="warning">Warning</Tag>
        <Tag tone="danger">Danger</Tag>
      </div>
    </div>
  );
}
