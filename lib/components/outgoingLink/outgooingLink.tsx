import { ReactNode } from "react";
import styles from "./outgoingLink.module.css";

interface LinkOutgoingProps {
  children: ReactNode;
  to: string;
}

export const OutgoingLink = ({ children, to }: LinkOutgoingProps) => {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={to}
      className={styles.link}
    >
      <>
        {children}
        <img className={styles.link} src="/arrow_right--blue.svg" />
      </>
    </a>
  );
};
