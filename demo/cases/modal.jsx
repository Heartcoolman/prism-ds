import { useState } from "react";
import { Modal, Button } from "../../dist/index.js";

export default function Demo() {
  const [open, setOpen] = useState(false);
  return (
    <div className="case">
      <Button onClick={() => setOpen(true)}>打开对话框</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="确认订阅"
        actions={
          <>
            <Button variant="gray" onClick={() => setOpen(false)}>
              取消
            </Button>
            <Button onClick={() => setOpen(false)}>订阅</Button>
          </>
        }
      >
        每月 ¥18，随时可取消。订阅后立即生效。
      </Modal>
    </div>
  );
}
