import { createContext, ReactNode, useContext } from "react";
import { Chain } from "viem";

interface ChainContextValue {
  chainEthereum: Chain;
}

const ChainContext = createContext<ChainContextValue | undefined>(undefined);

export const ChainProvider = ({
  chainEthereum,
  children,
}: {
  chainEthereum: Chain;
  children: ReactNode;
}) => {
  return (
    <ChainContext.Provider value={{ chainEthereum }}>
      {children}
    </ChainContext.Provider>
  );
};

export const useChainEthereum = (): Chain => {
  const context = useContext(ChainContext);
  if (!context) {
    throw new Error("useChainEthereum must be used within a ChainProvider");
  }
  return context.chainEthereum;
};
