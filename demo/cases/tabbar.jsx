import { useState } from "react";
import { TabBar, Icon } from "../../dist/index.js";

const ITEMS = [
  { key: "home", label: "Home", icon: <Icon name="home" /> },
  { key: "search", label: "Search", icon: <Icon name="search" /> },
  { key: "favorites", label: "Favorites", icon: <Icon name="heart" /> },
  { key: "profile", label: "Profile", icon: <Icon name="user" /> },
];

export default function Demo() {
  const [tab, setTab] = useState("home");

  return (
    <div className="case">
      <TabBar items={ITEMS} value={tab} onChange={setTab} />
    </div>
  );
}
