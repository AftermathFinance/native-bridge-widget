import type { Preview } from "@storybook/react";
import React from "react";
import globals from "../lib/theme/globals.module.css";
import "../lib/theme/theme.css";

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
  decorators: [
    (Story) => (
      <div className={globals.root}>
        <Story />
      </div>
    ),
  ],
};

export default preview;
