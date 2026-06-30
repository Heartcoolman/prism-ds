import { Spinner } from "../../dist/index.js";

export default function Demo() {
  return (
    <div className="case">
      <div style={{ display: "flex", gap: 28, alignItems: "center", flexWrap: "wrap" }}>
        <Spinner size="small" />
        <Spinner size="medium" />
        <Spinner size="large" />
        <Spinner size="medium" showLabel label="Loading…" />
      </div>
    </div>
  );
}
