import React from "react";

export interface CardProps extends React.ComponentPropsWithRef<"div"> {
  className?: string;
  children: React.ReactNode;
}
export const Card = ({ className, children, ...divProps }: CardProps) => {
  return (
    <div className={className} {...divProps}>
      {children}
    </div>
  );
};
