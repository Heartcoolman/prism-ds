import { Avatar, AvatarGroup } from "../../dist/index.js";

export default function Demo() {
  return (
    <div className="case">
      <div style={{ display: "flex", flexDirection: "column", gap: 18, alignItems: "center" }}>
        <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
          <Avatar name="Ada Lovelace" size="small" />
          <Avatar name="Grace Hopper" size="medium" status="online" />
          <Avatar
            src="https://i.pravatar.cc/112?img=12"
            name="Linus"
            size="large"
          />
        </div>
        <AvatarGroup max={3}>
          <Avatar name="Ada" />
          <Avatar name="Bob" />
          <Avatar name="Cara" />
          <Avatar name="Dan" />
          <Avatar name="Eve" />
        </AvatarGroup>
      </div>
    </div>
  );
}
