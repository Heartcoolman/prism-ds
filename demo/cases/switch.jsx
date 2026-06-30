import { useState } from "react";
import { Switch } from "../../dist/index.js";

export default function Demo() {
  const [wifi, setWifi] = useState(true);
  const [bluetooth, setBluetooth] = useState(false);
  return (
    <div className="case">
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <Switch
          label="Wi-Fi"
          checked={wifi}
          onChange={(e) => setWifi(e.target.checked)}
        />
        <Switch
          label="Bluetooth"
          checked={bluetooth}
          onChange={(e) => setBluetooth(e.target.checked)}
        />
        <Switch label="Airplane Mode (disabled)" disabled />
      </div>
    </div>
  );
}
