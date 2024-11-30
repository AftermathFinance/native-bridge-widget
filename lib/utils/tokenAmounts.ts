export function validBigInt(value: string): boolean {
  try {
    BigInt(value);
  } catch (error) {
    return false;
  }
  return true;
}
export function formatPercentage(
  bigIntValue: number,
  decimalPlaces: number = 2,
): string {
  const stringValue = bigIntValue.toString();
  const length = stringValue.length;

  if (length <= decimalPlaces) {
    // If the string is shorter than the desired decimal places, prepend zeros
    return "0." + "0".repeat(decimalPlaces - length) + stringValue;
  } else {
    // Insert the decimal point at the correct position
    const integerPart = stringValue.slice(0, length - decimalPlaces);
    const decimalPart = stringValue.slice(length - decimalPlaces);
    return integerPart + "." + decimalPart;
  }
}

export function truncBigInt(
  bigIntValue: bigint,
  decimalPlaces: number = 0,
): string {
  const stringValue = bigIntValue.toString();
  const length = stringValue.length;
  if (length <= decimalPlaces) {
    // If the string is shorter than the desired decimal places, prepend zeros
    return "0." + "0".repeat(decimalPlaces - length) + stringValue;
  } else {
    // Insert the decimal point at the correct position
    const integerPart = stringValue.slice(0, length - decimalPlaces);
    return integerPart;
  }
}
export function validTokenAmount(value: string, limit?: bigint) {
  if (!validBigInt(value)) return false;
  const value_n = BigInt(value);
  return (
    0 < value_n && ((limit && value_n <= limit) || typeof limit === "undefined")
  );
}

/*
This function should recieve a string representing a token amount, and the decimal places required.
 
Examples: (Commas are there for visual purposes only).
 - 1, with 3 decimals should return 0.001
 - 1000, with 3 decimals should return 1
 - 1,000,000, with 5 decimals should return 10
 
Any non valid input should be returned as is.
*/
export function tokenAmountStringToMinimalUnit(
  value: string,
  decimals: number,
): string {
  let returnable = "";
  if (value === "") {
    returnable = "";
  } else if (validBigInt(value) && BigInt(value) === 0n) returnable = "0";
  else if (value[0] === "." || value[value.length - 1] === ".")
    returnable = value;
  else if (validBigInt(value.replace(".", ""))) {
    const integerPart = value.slice(0, value.length - decimals);
    const decimalPart = value.slice(value.length - decimals);
    returnable = (integerPart + "." + decimalPart)
      .replace(/0+$/, "")
      .replace(/^0+/, "");
    if (returnable[0] === ".") returnable = "0" + returnable;
    if (returnable[returnable.length - 1] === ".")
      returnable = returnable.slice(0, -1);
  } else returnable = value;
  return returnable;
}

/*
This function should recieve a string representing a token amount possible considering decimals
and return a string representing the same amount in verbatim unit, i.e. without decimals.
 
Examples: (Commas are there for visual purposes only).
 - 1.1, with 3 decimals should return 1,100
 - 0.001 with 15 decimals should return 1,000,000,000,000
 - 1.001 with 18 decimals should return 1,000,001,000,000,000,000
 
Any non valid input should be returned as is.
*/
export function tokenAmountStringToVerbatimUnit(
  value: string,
  decimals: number,
): string {
  let returnable = "";
  if (value === "") returnable = "";
  else if (
    value.split(".").length - 1 <= 1 &&
    validBigInt(value.replace(".", "")) &&
    BigInt(value.replace(".", "")) > 0n
  ) {
    const integerPart = value.split(".")[0];
    const decimalPart = value.split(".")[1] || "";
    returnable = integerPart + decimalPart.padEnd(100, "0").slice(0, decimals);
  } else returnable = value;
  return returnable;
}

/*
This function should recieve an integer representing a dolar amount in verbatim unit, i.e. without decimals,
and return a string representing the same amount formated as a dolar amount.

Examples:
  - 1,100 should return $1.10
  - 1,000,000,000,000 should return $1,000,000,000.00
  - 1,000,001,000,000,000,000 should return $1,000,001,000,000,000.00
*/
export function dollarAmountIntegerToString(value: number): string {
  const decimals = 6;
  return (value / 10 ** decimals).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function tokenAmountBigIntToString(
  value: bigint,
  decimals:
    | 0
    | 1
    | 6
    | 10
    | 2
    | 3
    | 4
    | 5
    | 7
    | 8
    | 9
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 17
    | 18
    | 19
    | 20,
): string {
  return (value / 10n ** BigInt(decimals)).toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  });
}
