import { parseUnits } from "viem";

export function parseStringToBigInt(value: string, decimals = 18) {
  // remove commas and non numeric characters, leave the decimal point
  const cleanValue = value.replace(/[^0-9.]/g, "");
  // parse the value to a big int
  return parseUnits(cleanValue, decimals);
}
