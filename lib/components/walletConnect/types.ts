export interface WalletConnectProps {
  onClick?: () => void;
  label?: string;
  state?: "connected" | "disconnected";
}

export interface ManualWalletProps {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  valid: boolean;
}
