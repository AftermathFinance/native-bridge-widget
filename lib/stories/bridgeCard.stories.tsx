import type { Meta, StoryObj } from "@storybook/react";
import {
  BridgeCard,
  BridgeCardProps,
} from "../components/bridgeCard/bridgeCard";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta = {
  title: "Components/Bridge Card",
  component: BridgeCard,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypesbackground: #EEEEEE;
} satisfies Meta<typeof BridgeCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const BridgeDisconnected: Story = {
  args: {
    cardStyle: { hasBackgroundImage: true },
    valueInput: {
      value: "",
      balanceAmount: "0.0",
      placeholder: "0.0",
      select: {
        value: "ETH",
        items: [
          { label: "ETH", icon: "/ETH.svg" },
          { label: "wBTC", icon: "/wBTC.svg" },
        ],
      },
    },
    ethereum: {
      walletConnect: {
        label: "Connect wallet",
        state: "disconnected",
        onClick: () => {},
      },
    },
    sui: {
      onChange: () => {},
      value: "",
      valid: true,
    },
    button: {
      label: "Bridge assets",
      onClick: () => {},
      disabled: true,
    },
    receive: {
      amount: "0.0",
      symbol: "SUI",
    },
  } as BridgeCardProps,
};

export const BridgeConnectedEth: Story = {
  args: {
    cardStyle: { hasBackgroundImage: true },
    valueInput: {
      value: "",
      balanceAmount: "0.0",
      placeholder: "0.0",
      select: {
        value: "ETH",
        items: [
          { label: "ETH", icon: "/ETH.svg" },
          { label: "wBTC", icon: "/wBTC.svg" },
        ],
      },
    },
    ethereum: {
      walletConnect: {
        label: "0xFr3n...28re",
        state: "connected",
        onClick: () => {},
      },
    },
    sui: {
      onChange: () => {},
      value: "",
      valid: true,
    },
    button: {
      label: "Bridge assets",
      onClick: () => {},
      disabled: true,
    },
    receive: {
      amount: "0.0",
      symbol: "SUI",
    },
  } as BridgeCardProps,
};

export const BridgeConnectedSui: Story = {
  args: {
    cardStyle: { hasBackgroundImage: true },
    valueInput: {
      value: "",
      balanceAmount: "0.0",
      placeholder: "0.0",
      select: {
        value: "ETH",
        items: [
          { label: "ETH", icon: "/ETH.svg" },
          { label: "wBTC", icon: "/wBTC.svg" },
        ],
      },
    },
    ethereum: {
      walletConnect: {
        label: "0xFr3n...28re",
        state: "connected",
        onClick: () => {},
      },
    },
    sui: {
      onChange: () => {},
      value: "",
      valid: true,
    },
    button: {
      label: "Bridge assets",
      onClick: () => {},
      disabled: false,
    },
    receive: {
      amount: "0.0",
      symbol: "SUI",
    },
  } as BridgeCardProps,
};

export const BridgeNoImage: Story = {
  args: {
    cardStyle: { hasBackgroundImage: false },
    valueInput: {
      value: "",
      balanceAmount: "0.0",
      placeholder: "0.0",
      select: {
        value: "ETH",
        items: [
          { label: "ETH", icon: "/ETH.svg" },
          { label: "wBTC", icon: "/wBTC.svg" },
        ],
      },
    },
    ethereum: {
      walletConnect: {
        label: "Connect wallet",
        state: "disconnected",
        onClick: () => {},
      },
    },
    sui: {
      onChange: () => {},
      value: "",
      valid: true,
    },
    button: {
      label: "Bridge assets",
      onClick: () => {},
      disabled: true,
    },
    receive: {
      amount: "0.0",
      symbol: "SUI",
    },
  } as BridgeCardProps,
};
