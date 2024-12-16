import { createContext, useContext } from "react";
import { BridgeTokenSymbols } from "../types";

interface TokenListContextValue {
  tokenList: BridgeTokenSymbols[];
}

export const TokenListContext = createContext<
  TokenListContextValue | undefined
>(undefined);

export const useTokenList = (): BridgeTokenSymbols[] => {
  const context = useContext(TokenListContext);
  if (!context) {
    throw new Error("useTokenList must be used within a TokenListProvider");
  }
  return context.tokenList;
};
