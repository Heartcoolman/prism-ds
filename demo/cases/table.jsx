import { useState } from "react";
import { Table, Button } from "../../dist/index.js";

export default function Demo() {
  const [asc, setAsc] = useState(true);

  const columns = [
    { key: "name", header: "Product" },
    { key: "stock", header: "Stock", numeric: true },
    { key: "price", header: "Price", numeric: true },
  ];

  const base = [
    { name: "Keyboard", stock: 24, price: "$79" },
    { name: "Mouse", stock: 8, price: "$49" },
    { name: "Monitor", stock: 15, price: "$299" },
  ];

  const rows = [...base].sort((a, b) => (asc ? a.stock - b.stock : b.stock - a.stock));

  return (
    <div className="case">
      <div style={{ marginBottom: 8 }}>
        <Button variant="gray" size="small" onClick={() => setAsc((v) => !v)}>
          Sort by stock {asc ? "↑" : "↓"}
        </Button>
      </div>
      <Table caption="Inventory" columns={columns} rows={rows} />
    </div>
  );
}
