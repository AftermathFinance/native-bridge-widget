import type { Meta, StoryObj } from "@storybook/react";
import { QueryClient } from "@tanstack/react-query";
import { mainnet, sepolia } from "viem/chains";
import { createConfig, http } from "wagmi";
import { BridgeContainer } from "../features/bridge/bridgeContainer";

const queryClient = new QueryClient();
export const wagmiConfig = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta = {
  title: "Components/Bridge Container",
  component: BridgeContainer,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypesbackground: #EEEEEE;
} satisfies Meta<typeof BridgeContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BridgeDisconnected: Story = {
  args: {
    style: { hasBackgroundImage: true },
    queryClient,
    wagmiConfig,
  },
};
