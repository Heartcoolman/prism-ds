import { Tooltip, Button } from "../../dist/index.js";

export default function Demo() {
  return (
    <div className="case" style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
      <Tooltip label="Shown on top" placement="top">
        <Button variant="tinted" size="small">Hover top</Button>
      </Tooltip>
      <Tooltip label="Shown on the right" placement="right">
        <Button variant="gray" size="small">Hover right</Button>
      </Tooltip>
      <Tooltip label="Shown below" placement="bottom">
        <Button variant="bordered" size="small">Hover bottom</Button>
      </Tooltip>
      <Tooltip label="Always visible" placement="top" open>
        <Button variant="plain" size="small">Forced open</Button>
      </Tooltip>
    </div>
  );
}
