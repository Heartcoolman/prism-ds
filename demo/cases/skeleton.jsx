import { Skeleton } from "../../dist/index.js";

export default function Demo() {
  return (
    <div className="case">
      <div style={{ display: "flex", alignItems: "center", gap: 16, width: 300 }}>
        <Skeleton variant="circle" width={56} />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
          <Skeleton variant="text" lines={3} />
          <Skeleton variant="rect" width="100%" height={48} />
        </div>
      </div>
    </div>
  );
}
