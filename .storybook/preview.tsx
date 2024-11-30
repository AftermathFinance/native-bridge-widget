import { createAppKit } from "@reown/appkit";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import type { Preview } from "@storybook/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { http } from "viem";
import { mainnet, sepolia } from "viem/chains";
import { WagmiProvider, fallback } from "wagmi";
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

const localWagmiAdapter = new WagmiAdapter({
  networks: [sepolia],
  projectId: "eb014baebd65cd4b4407523fae4cc6d5",
  transports: {
    [mainnet.id]: fallback([
      http("https://ethereum.publicnode.com"),
      http("https://rpc.ankr.com/eth"),
      http("https://eth-mainnet.public.blastapi.iom"),
      http("https://rpc.flashbots.net"),
      http("https://eth.merkle.io"),
      http(),
    ]),

    [sepolia.id]: fallback([
      http("https://eth-sepolia.public.blastapi.io"),
      http("https://sepolia.drpc.org"),
      http("https://endpoints.omniatech.io/v1/eth/sepolia/public"),
      http("https://ethereum-sepolia-rpc.publicnode.com"),
      http("https://gateway.tenderly.co/public/sepolia"),
      http(),
    ]),
  },
});

createAppKit({
  adapters: [localWagmiAdapter],
  projectId: "eb014baebd65cd4b4407523fae4cc6d5",
  networks: [sepolia],
  features: {
    analytics: false,
    email: false,
    emailShowWallets: false,
    socials: [],
    swaps: false,
    onramp: false,
  },
  allowUnsupportedChain: false,
  themeMode: "dark",
  themeVariables: {
    "--w3m-accent": "#4da2ff",
    "--w3m-color-mix": "#4da2ff",
    "--w3m-color-mix-strength": 20,
    "--w3m-font-family": "Inter, Roboto, sans-serif",
    "--w3m-font-size-master": "10px",
    "--w3m-border-radius-master": "2px",
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
      <WagmiProvider config={localWagmiAdapter.wagmiConfig}>
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
