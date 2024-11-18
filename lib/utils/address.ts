export function addressToFriendly(address: string): string {
  if (address.length < 10) {
    return address;
  }

  return `${address.slice(0, 6)}…${address.slice(-4)}`;
}
