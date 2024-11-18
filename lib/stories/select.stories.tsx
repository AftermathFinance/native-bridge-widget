import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "../components/select/select";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta = {
  title: "Components/Select",
  component: Select,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypesbackground: #EEEEEE;
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const SelectTrigger: Story = {
  args: {
    defaultValue: "ETH",
    items: [
      { label: "ETH", icon: "/ETH.svg" },
      { label: "USDT", icon: "/USDT.svg" },
      { label: "USDC", icon: "/USDC.svg" },
      { label: "wBTC", icon: "/wBTC.svg" },
      { label: "wETH", icon: "/wETH.svg" },
    ],
  },
};

export const SelectContent: Story = {
  args: {
    defaultValue: "ETH",
    defaultOpen: true,
    open: true,
    items: [
      { label: "ETH", icon: "/ETH.svg" },
      { label: "USDT", icon: "/USDT.svg" },
      { label: "USDC", icon: "/USDC.svg" },
      { label: "wBTC", icon: "/wBTC.svg" },
      { label: "wETH", icon: "/wETH.svg" },
    ],
  },
};
