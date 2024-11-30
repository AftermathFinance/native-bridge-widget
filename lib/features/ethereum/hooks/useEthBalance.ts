import { useAccount, useBalance } from "wagmi";
import { stringNumberToInput } from "../../../utils/string";
import { TokenBalance } from "../types";

export const useEthBalance = (): TokenBalance => {
  const { address } = useAccount();
  const { data: ethBalance } = useBalance({
    address,
  });

  if (ethBalance === undefined) {
    return {
      value: 0n,
      formatted: "0",
      display: "0",
      decimals: 18,
      symbol: "ETH",
    };
  }

  console.log("ETH Balance:", ethBalance);

  const amountDisplay = stringNumberToInput(
    ethBalance.formatted,
    ethBalance.decimals,
  );

  return {
    ...ethBalance,
    display: amountDisplay,
  };
};
