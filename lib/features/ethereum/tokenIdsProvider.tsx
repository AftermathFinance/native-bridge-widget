import { ReactNode } from "react";
import { TokenIdsContext } from "./hooks/useTokenIds";
import { BridgeTokenId } from "./types";

export const TokenIdsProvider = ({
  tokenIds,
  children,
}: {
  tokenIds: BridgeTokenId[];
  children: ReactNode;
}) => {
  return (
    <TokenIdsContext.Provider value={{ tokenIds }}>
      {children}
    </TokenIdsContext.Provider>
  );
};
