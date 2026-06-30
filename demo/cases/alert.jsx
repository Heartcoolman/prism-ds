import { useState } from "react";
import { Alert, Button } from "../../dist/index.js";

export default function Demo() {
  const [open, setOpen] = useState(false);
  return (
    <div className="case">
      <Button variant="filled" tone="danger" onClick={() => setOpen(true)}>
        删除文件
      </Button>
      <Alert
        open={open}
        title="删除此文件？"
        message="此操作无法撤销。"
        confirmLabel="删除"
        cancelLabel="取消"
        destructive
        onClose={() => setOpen(false)}
        onConfirm={() => setOpen(false)}
      />
    </div>
  );
}
