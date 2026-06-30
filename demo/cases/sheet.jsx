import { useState } from "react";
import { Sheet, Button } from "../../dist/index.js";

export default function Demo() {
  const [open, setOpen] = useState(false);
  return (
    <div className="case">
      <Button onClick={() => setOpen(true)}>打开底部面板</Button>
      <Sheet open={open} onClose={() => setOpen(false)} title="分享到">
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <Button variant="gray" fullWidth>
            拷贝链接
          </Button>
          <Button variant="gray" fullWidth>
            添加到收藏
          </Button>
          <Button variant="plain" fullWidth onClick={() => setOpen(false)}>
            取消
          </Button>
        </div>
      </Sheet>
    </div>
  );
}
