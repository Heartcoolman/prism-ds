import { useState } from "react";
import { SearchField } from "../../dist/index.js";

export default function Demo() {
  const [query, setQuery] = useState("Prism");
  const [filter, setFilter] = useState("");
  return (
    <div className="case">
      <SearchField
        fullWidth
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onClear={() => setQuery("")}
        placeholder="Search"
      />
      <div style={{ marginTop: 12 }}>
        <SearchField
          fullWidth
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          onClear={() => setFilter("")}
          placeholder="Filter results"
        />
      </div>
    </div>
  );
}
