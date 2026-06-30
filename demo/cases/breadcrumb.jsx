import { useState } from "react";
import { Breadcrumb, Button } from "../../dist/index.js";

const full = [
  { label: "首页" },
  { label: "文档" },
  { label: "组件" },
  { label: "面包屑" },
];

export default function Demo() {
  const [count, setCount] = useState(full.length);
  const items = full.slice(0, count);
  return (
    <div className="case">
      <Breadcrumb items={items} onNavigate={(index) => setCount(index + 1)} />
      {count < full.length && (
        <div style={{ marginTop: 12 }}>
          <Button
            variant="tinted"
            size="small"
            onClick={() => setCount(full.length)}
          >
            重置路径
          </Button>
        </div>
      )}
    </div>
  );
}
