import { useState } from "react";
import { Menu, Button } from "../../dist/index.js";

export default function Demo() {
  const [open, setOpen] = useState(false);
  const [last, setLast] = useState("");

  const items = [
    { label: "Edit", onSelect: () => setLast("Edit") },
    { label: "Duplicate", onSelect: () => setLast("Duplicate") },
    { label: "Archive", disabled: true },
    "separator",
    { label: "Delete", danger: true, onSelect: () => setLast("Delete") },
  ];

  return (
    <div className="case">
      <div style={{ position: "relative", display: "inline-block" }}>
        <Button variant="tinted" size="small" onClick={() => setOpen((o) => !o)}>
          Actions
        </Button>
        <Menu
          items={items}
          open={open}
          onClose={() => setOpen(false)}
          style={{ position: "absolute", top: "100%", left: 0, marginTop: 6, zIndex: 1 }}
        />
      </div>
      {last && (
        <p style={{ marginTop: 12, fontSize: 13, opacity: 0.7 }}>Selected: {last}</p>
      )}
    </div>
  );
}
