export function addressToFriendly(address: string): string {
  if (address.length < 10) {
    return address;
  }

  return `${address.slice(0, 6)}…${address.slice(-4)}`;
}

export const SUI_ADDRESS_LENGTH = 32;

function getHexByteLength(value: string): number {
  return /^(0x|0X)/.test(value) ? (value.length - 2) / 2 : value.length / 2;
}

function isHex(value: string): boolean {
  return /^(0x|0X)?[a-fA-F0-9]+$/.test(value) && value.length % 2 === 0;
}

export function isValidSuiAddress(value: string): value is string {
  return isHex(value) && getHexByteLength(value) === SUI_ADDRESS_LENGTH;
}
