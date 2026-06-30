import { useState } from "react";
import { Banner, Button } from "../../dist/index.js";

export default function Demo() {
  const [shown, setShown] = useState({ info: true, success: true, warning: true });
  const hide = (k) => setShown((s) => ({ ...s, [k]: false }));
  const allHidden = !shown.info && !shown.success && !shown.warning;
  return (
    <div className="case">
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {shown.info && (
          <Banner tone="info" title="Heads up" onClose={() => hide("info")}>
            A new software update is available.
          </Banner>
        )}
        {shown.success && (
          <Banner tone="success" title="Saved" onClose={() => hide("success")}>
            Your changes were published.
          </Banner>
        )}
        {shown.warning && (
          <Banner
            tone="warning"
            title="Storage almost full"
            action={<Button size="small" variant="tinted">Manage</Button>}
          >
            Free up space to continue syncing.
          </Banner>
        )}
        {allHidden && (
          <Button
            variant="gray"
            size="small"
            onClick={() => setShown({ info: true, success: true, warning: true })}
          >
            Reset banners
          </Button>
        )}
      </div>
    </div>
  );
}
