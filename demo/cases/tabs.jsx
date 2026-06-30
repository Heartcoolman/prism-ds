import { useState } from "react";
import { Tabs } from "../../dist/index.js";

const TABS = [
  { key: "overview", label: "Overview" },
  { key: "specs", label: "Specs" },
  { key: "reviews", label: "Reviews" },
];

const BODY = {
  overview: "A quick summary of the product highlights.",
  specs: "Technical specifications and dimensions.",
  reviews: "What customers are saying about it.",
};

export default function Demo() {
  const [tab, setTab] = useState("overview");

  return (
    <div className="case" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Tabs tabs={TABS} value={tab} onChange={setTab} fullWidth />
      <p style={{ margin: 0, fontSize: 14, opacity: 0.7 }}>{BODY[tab]}</p>
    </div>
  );
}
