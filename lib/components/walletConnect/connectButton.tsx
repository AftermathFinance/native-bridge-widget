import globals from "../../theme/globals.module.css";
import typography from "../../theme/typography.module.css";
import styles from "./walletConnect.module.css";

interface ConnectButtonProps {
  label: string;
  icon?: string;
  part?: "sui" | "eth";
  onClick?: () => void;
}

export const ConnectButton = ({
  label,
  icon,
  part = "eth",
  onClick,
}: ConnectButtonProps) => {
  const spanClass = part === "sui" ? typography.colorInverted : "";

  return (
    <button
      className={`${globals.buttonReset} ${styles.connectButton}`}
      onClick={onClick}
    >
      <span
        className={`${typography.large} ${styles.connectButtonLabel} ${spanClass}`}
      >
        {label}
      </span>
      {icon && <img className={styles.connectButtonIcon} src={icon} />}
    </button>
  );
};
