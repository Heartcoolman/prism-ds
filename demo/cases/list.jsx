import { useState } from "react";
import { List, ListRow } from "../../dist/index.js";

export default function Demo() {
  const [selected, setSelected] = useState("wifi");

  const rows = [
    { id: "wifi", title: "Wi-Fi", subtitle: "PrismNet" },
    { id: "bluetooth", title: "Bluetooth", subtitle: "On" },
    { id: "cellular", title: "Cellular", subtitle: "Off" },
  ];

  return (
    <div className="case">
      <List inset>
        {rows.map((row) => (
          <ListRow
            key={row.id}
            title={row.title}
            subtitle={row.subtitle}
            trailing={selected === row.id ? "✓" : ""}
            chevron
            onClick={() => setSelected(row.id)}
          />
        ))}
      </List>
    </div>
  );
}
