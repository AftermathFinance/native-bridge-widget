import { BridgeToken, BridgeTokenId } from "./types";

export interface GetBridgeTokensProps {
  isMainnet: boolean;
  tokenIds: BridgeTokenId[];
  all?: boolean;
}

// TODO: Add custom tokens option
/*
 it’s in the BridgeConfig contract:

Mainnet: https://etherscan.io/address/0x72D34Fe82c71Bf8120647518e5128e53106a1540

Testnet: https://sepolia.etherscan.io/address/0x624Ddc521b3934CaFb94AA6a4fF120fc8FA45B5F
*/
export const getBridgeTokens = ({
  isMainnet,
  tokenIds,
  all,
}: GetBridgeTokensProps): BridgeToken[] => {
  const eth: BridgeToken = {
    symbol: "ETH",
    tokenId: 2,
    decimals: 18,
    icon: "/ETH.svg",
  };

  const mainnetTokens: BridgeToken[] = [
    {
      symbol: "wETH",
      tokenId: 2,
      address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
      decimals: 18,
      icon: "/wETH.svg",
    },
  ];

  const sepoliaTokens: BridgeToken[] = [
    {
      symbol: "wETH",
      tokenId: 2,
      address: "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14",
      decimals: 18,
      icon: "/wETH.svg",
    },
  ];

  if (all) {
    return isMainnet ? [eth, ...mainnetTokens] : [eth, ...sepoliaTokens];
  }

  const tokens = tokenIds.map((tokenId) => {
    if (isMainnet) {
      return mainnetTokens.find((token) => token.tokenId === tokenId);
    }

    return sepoliaTokens.find((token) => token.tokenId === tokenId);
  });

  return [eth, ...tokens] as BridgeToken[];
};

export interface GetBridgeTokenProps {
  isMainnet: boolean;
  tokenSymbol: string;
}

export const getBridgeToken = ({
  isMainnet,
  tokenSymbol,
}: GetBridgeTokenProps): BridgeToken => {
  const tokens = getBridgeTokens({ isMainnet, tokenIds: [], all: true });

  const token = tokens.find((token) => token.symbol === tokenSymbol);

  if (!token) {
    throw new Error(`Token with symbol ${tokenSymbol} not found`);
  }
  return token;
};
