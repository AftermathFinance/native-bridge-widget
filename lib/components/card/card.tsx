import React from "react";
import globals from "../../theme/globals.module.css";
import styles from "./card.module.css";

export interface Style {
  hasBackgroundImage?: boolean;
}

export interface CardProps extends React.ComponentPropsWithRef<"div"> {
  className?: string;
  children: React.ReactNode;
  customStyle?: Style;
}
export const Card = ({
  className,
  children,
  customStyle = { hasBackgroundImage: true },
  ...divProps
}: CardProps) => {
  let rootClass = "";
  if (customStyle?.hasBackgroundImage) {
    rootClass = globals.imageBg;
  }

  return (
    <div className={`${globals.root} ${rootClass}`}>
      <div className={`${styles.card} ${className}`} {...divProps}>
        {children}
      </div>
    </div>
  );
};
