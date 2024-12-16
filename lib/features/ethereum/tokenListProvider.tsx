import { ReactNode } from "react";
import { TokenListContext } from "./hooks/useTokenList";
import { BridgeTokenSymbols } from "./types";

export const TokenListProvider = ({
  tokenList,
  children,
}: {
  tokenList: BridgeTokenSymbols[];
  children: ReactNode;
}) => {
  return (
    <TokenListContext.Provider value={{ tokenList: tokenList }}>
      {children}
    </TokenListContext.Provider>
  );
};
