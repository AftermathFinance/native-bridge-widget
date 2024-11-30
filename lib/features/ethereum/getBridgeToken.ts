import { BridgeToken, BridgeTokenSymbols } from "./types";

export interface GetBridgeTokensProps {
  isMainnet: boolean;
}

export const getBridgeTokens = ({
  isMainnet,
}: GetBridgeTokensProps): BridgeToken[] => {
  const mainnetTokens: BridgeToken[] = [
    {
      symbol: "ETH",
      tokenID: 2,
      decimals: 18,
      icon: "/ETH.svg",
    },
    {
      symbol: "wETH",
      tokenID: 2,
      address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
      decimals: 18,
      icon: "/wETH.svg",
    },
  ];

  const sepoliaTokens: BridgeToken[] = [
    {
      symbol: "ETH",
      tokenID: 2,
      decimals: 18,
      icon: "/ETH.svg",
    },
    {
      symbol: "wETH",
      tokenID: 2,
      address: "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14",
      decimals: 18,
      icon: "/wETH.svg",
    },
  ];

  return isMainnet ? mainnetTokens : sepoliaTokens;
};

export interface GetBridgeTokenProps {
  isMainnet: boolean;
  tokenSymbol: BridgeTokenSymbols;
}

export const getBridgeToken = ({
  isMainnet,
  tokenSymbol,
}: GetBridgeTokenProps): BridgeToken => {
  const tokens = getBridgeTokens({ isMainnet });

  const token = tokens.find((token) => token.symbol === tokenSymbol);

  if (!token) {
    throw new Error(`Token with symbol ${tokenSymbol} not found`);
  }
  return token;
};
