interface stringNumberToLocaleProps {
  value: string | undefined;
  decimals?: number;
  maxDecimals?: number;
}

export function stringNumberToLocale({
  value,
  decimals = 18,
  maxDecimals,
}: stringNumberToLocaleProps) {
  if (value === undefined || value === "") {
    return "";
  }

  const cleanValue = value.replace(/[^0-9.]/g, "");
  const parts = cleanValue.split(".");

  // Apply formatting to the integer part
  parts[0] = parseInt(parts[0]).toLocaleString("en-US");

  if (decimals === 0 || maxDecimals === 0) {
    return parts[0];
  }

  // Enforce the number of decimals
  if (parts[1] !== undefined) {
    parts[1] = parts[1].slice(0, Math.min(decimals, parts[1].length));

    if (maxDecimals !== undefined) {
      parts[1] = parts[1].slice(0, maxDecimals).replace(/0+$/, "");
    }
  }

  if (parts[1] === "") {
    return parts[0];
  }

  return parts.join(".");
}

export function stringNumberToInput(value: string, decimals = 18) {
  const cleanValue = value.replace(/[^0-9.]/g, "");
  const removedLeadingZeroes = stringRemoveLeadingZeroes(cleanValue);
  const parts = removedLeadingZeroes.split(".");
  if (parts[1] !== undefined) {
    parts[1] = parts[1].slice(0, Math.min(decimals, parts[1].length));
  }

  return parts.join(".");
}

export function stringRemoveLeadingZeroes(value: string) {
  if (value.startsWith("0")) {
    if (value.length > 1 && value.charAt(1) && value.charAt(1) != ".") {
      value = value.substring(1);
    }
  }
  return value;
}

export function numberToDollarAbbr(num: number): string {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "K" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "B" },
  ];
  const regexp = /\.0+$|(?<=\.[0-9]*[1-9])0+$/;
  const item = lookup
    .slice()
    .reverse()
    .find((item) => num >= item.value);
  return item
    ? "$" +
        (num / item.value).toFixed(0).replace(regexp, "").concat(item.symbol)
    : "$0";
}
