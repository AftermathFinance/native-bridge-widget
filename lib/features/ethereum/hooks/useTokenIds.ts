import { createContext, useContext } from "react";
import { BridgeTokenId } from "../types";

interface TokenIdsContextValue {
  tokenIds: BridgeTokenId[];
}

export const TokenIdsContext = createContext<TokenIdsContextValue | undefined>(
  undefined,
);

export const useTokenIds = (): BridgeTokenId[] => {
  const context = useContext(TokenIdsContext);
  if (!context) {
    throw new Error("useTokenIds must be used within a TokenIdsProvider");
  }
  return context.tokenIds;
};
