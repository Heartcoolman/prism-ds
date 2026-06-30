import { useState } from "react";
import { Slider } from "../../dist/index.js";

export default function Demo() {
  const [volume, setVolume] = useState(60);
  const [brightness, setBrightness] = useState(40);
  return (
    <div className="case">
      <Slider
        label="Volume"
        showValue
        min={0}
        max={100}
        value={volume}
        onChange={(e) => setVolume(Number(e.target.value))}
      />
      <div style={{ marginTop: 16 }}>
        <Slider
          label="Brightness"
          showValue
          min={0}
          max={100}
          step={5}
          value={brightness}
          onChange={(e) => setBrightness(Number(e.target.value))}
        />
      </div>
    </div>
  );
}
