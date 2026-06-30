// Live per-component demo host. Renders one component showcase by ?id, inside
// the docs iframe. Uses the real @prism-ds/react library (browser-native CSS).
import { Component, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "../dist/index.js";
import registry from "./cases/registry.js";

class Boundary extends Component {
  constructor(p) {
    super(p);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  render() {
    if (this.state.error) {
      return (
        <div className="case-error text-footnote">
          Demo failed to render: {String(this.state.error.message || this.state.error)}
        </div>
      );
    }
    return this.props.children;
  }
}

function postHeight() {
  const h = Math.ceil(document.documentElement.scrollHeight);
  parent.postMessage({ type: "prism-demo-height", id, height: h }, "*");
}

const params = new URLSearchParams(location.search);
const id = params.get("id") || "";
const dark = params.get("theme") === "dark";
const Demo = registry[id];

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <ThemeProvider colorScheme={dark ? "dark" : "light"}>
      <div className="case-root" data-prism-root>
        {Demo ? (
          <Boundary>
            <Demo />
          </Boundary>
        ) : (
          <div className="case-error text-footnote">Unknown demo: {id || "(none)"}</div>
        )}
      </div>
    </ThemeProvider>
  </StrictMode>
);

// Report height to the parent so the iframe can size itself.
window.addEventListener("load", postHeight);
if (typeof ResizeObserver !== "undefined") {
  new ResizeObserver(postHeight).observe(document.documentElement);
}
setTimeout(postHeight, 300);
