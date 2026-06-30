import { useState } from "react";
import { Popover, Button } from "../../dist/index.js";

export default function Demo() {
  const [open, setOpen] = useState(false);
  return (
    <div className="case">
      <Popover
        open={open}
        onClose={() => setOpen(false)}
        placement="bottom"
        content={
          <div style={{ maxWidth: 200 }}>
            <strong>键盘快捷键</strong>
            <p style={{ margin: "4px 0 0", fontSize: 13 }}>
              按 ⌘K 快速搜索，⌘/ 查看全部快捷键。
            </p>
          </div>
        }
      >
        <Button variant="tinted" onClick={() => setOpen((v) => !v)}>
          显示提示
        </Button>
      </Popover>
    </div>
  );
}
