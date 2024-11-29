import type { Preview } from "@storybook/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { http } from "viem";
import { mainnet, sepolia } from "viem/chains";
import { WagmiProvider, createConfig } from "wagmi";
import globals from "../lib/theme/globals.module.css";
import "../lib/theme/theme.css";

const queryClient = new QueryClient();

// eslint-disable-next-line @typescript-eslint/no-redeclare
declare global {
  interface BigInt {
    toJSON: () => string;
  }
}
BigInt.prototype.toJSON = function () {
  return this.toString();
};

export const wagmiConfig = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
  decorators: [
    (Story) => (
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <div className={globals.root}>
            <Story />
          </div>
        </QueryClientProvider>
      </WagmiProvider>
    ),
  ],
};

export default preview;
