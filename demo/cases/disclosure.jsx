import { Disclosure } from "../../dist/index.js";

export default function Demo() {
  return (
    <div className="case" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <Disclosure title="What is Prism?" defaultOpen>
        <p style={{ margin: 0, fontSize: 14, opacity: 0.8 }}>
          A themeable React design system with an Apple-inspired default look.
        </p>
      </Disclosure>
      <Disclosure title="Is it accessible?">
        <p style={{ margin: 0, fontSize: 14, opacity: 0.8 }}>
          Yes. The summary toggles an aria-controlled region with proper roles.
        </p>
      </Disclosure>
      <Disclosure title="Can I theme it?">
        <p style={{ margin: 0, fontSize: 14, opacity: 0.8 }}>
          Swap presets or override tokens to restyle every component.
        </p>
      </Disclosure>
    </div>
  );
}
