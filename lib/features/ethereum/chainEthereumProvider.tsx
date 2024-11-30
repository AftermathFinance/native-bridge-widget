import { ReactNode } from "react";
import { Chain } from "viem";
import { ChainContext } from "./hooks/useChainEthereum";

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
