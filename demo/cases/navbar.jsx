import { useState } from "react";
import { NavBar, Button } from "../../dist/index.js";

export default function Demo() {
  const [large, setLarge] = useState(false);
  return (
    <div className="case">
      <NavBar
        title="收件箱"
        onBack={() => {}}
        backLabel="返回"
        large={large}
        trailing={
          <Button variant="plain" size="small">
            编辑
          </Button>
        }
      />
      <div style={{ marginTop: 12 }}>
        <Button
          variant="tinted"
          size="small"
          onClick={() => setLarge((v) => !v)}
        >
          {large ? "切换为标准标题" : "切换为大标题"}
        </Button>
      </div>
    </div>
  );
}
