import { Card, Button } from "../../dist/index.js";

export default function Demo() {
  return (
    <div className="case" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
      <Card
        style={{ width: 200 }}
        media={
          <img
            src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=400&q=60"
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        }
        eyebrow="Featured"
        title="Mountain Trip"
        description="A short getaway above the clouds."
        footer={<Button variant="tinted" size="small">Book</Button>}
      />
      <Card
        interactive
        style={{ width: 200 }}
        eyebrow="Update"
        title="Interactive Card"
        description="Hover to see the lift affordance on clickable cards."
      />
    </div>
  );
}
