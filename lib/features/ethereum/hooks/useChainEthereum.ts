import { createContext, useContext } from "react";
import { Chain } from "viem";

interface ChainContextValue {
  chainEthereum: Chain;
}

export const ChainContext = createContext<ChainContextValue | undefined>(
  undefined,
);

export const useChainEthereum = (): Chain => {
  const context = useContext(ChainContext);
  if (!context) {
    throw new Error("useChainEthereum must be used within a ChainProvider");
  }
  return context.chainEthereum;
};
