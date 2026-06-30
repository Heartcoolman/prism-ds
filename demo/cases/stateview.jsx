import { useState } from "react";
import { StateView, Button, SegmentedControl } from "../../dist/index.js";

const states = {
  empty: { variant: "empty", title: "No items yet", description: "Add your first item to get started." },
  loading: { variant: "loading", title: "Loading…", description: "Fetching your data." },
  error: { variant: "error", title: "Something went wrong", description: "We couldn't load this page." },
  success: { variant: "success", title: "All done", description: "Your changes have been saved." },
};

export default function Demo() {
  const [key, setKey] = useState("empty");
  const s = states[key];
  return (
    <div className="case">
      <div style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "center" }}>
        <SegmentedControl
          value={key}
          onChange={setKey}
          options={[
            { value: "empty", label: "Empty" },
            { value: "loading", label: "Loading" },
            { value: "error", label: "Error" },
            { value: "success", label: "Success" },
          ]}
        />
        <StateView
          variant={s.variant}
          title={s.title}
          description={s.description}
          action={key === "error" ? <Button variant="filled">Retry</Button> : undefined}
        />
      </div>
    </div>
  );
}
