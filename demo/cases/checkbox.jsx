import { useState } from "react";
import { Checkbox } from "../../dist/index.js";

export default function Demo() {
  const [items, setItems] = useState({ photos: true, videos: false, docs: true });
  const values = Object.values(items);
  const allChecked = values.every(Boolean);
  const someChecked = values.some(Boolean);

  const toggle = (key) => (e) =>
    setItems((prev) => ({ ...prev, [key]: e.target.checked }));

  const toggleAll = (e) => {
    const next = e.target.checked;
    setItems({ photos: next, videos: next, docs: next });
  };

  return (
    <div className="case">
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <Checkbox
          label="Select all"
          checked={allChecked}
          indeterminate={!allChecked && someChecked}
          onChange={toggleAll}
        />
        <Checkbox label="Photos" checked={items.photos} onChange={toggle("photos")} />
        <Checkbox label="Videos" checked={items.videos} onChange={toggle("videos")} />
        <Checkbox label="Documents" checked={items.docs} onChange={toggle("docs")} />
        <Checkbox label="Archived (disabled)" disabled />
      </div>
    </div>
  );
}
