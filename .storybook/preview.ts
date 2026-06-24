import type { Preview } from "@storybook/react";
import "../src/styles/tokens.css";
import "../src/styles/global.css";

const preview: Preview = {
  parameters: {
    layout: "centered",
    controls: { expanded: true, matchers: { color: /(background|color)$/i } },
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#ffffff" },
        { name: "grouped", value: "#f5f5f7" },
        { name: "dark", value: "#000000" },
      ],
    },
  },
  decorators: [
    (Story, ctx) => {
      const dark = ctx.globals.backgrounds?.value === "#000000";
      const el = document.documentElement;
      el.setAttribute("data-theme", dark ? "dark" : "light");
      return Story();
    },
  ],
};

export default preview;
