import React, { HTMLProps, PropsWithChildren } from "react";

import { ButtonWrapper } from "../styled/common";

export interface ButtonProps {
  variant: "PRIMARY" | "SECONDARY" | "DANGER" | "GREEN";
  transparent?: boolean;
}

export const Button: React.FC<
  PropsWithChildren<HTMLProps<HTMLButtonElement> & ButtonProps>
> = ({ variant, transparent = false, children, ...props }) => {
  return (
    <ButtonWrapper {...props} variant={variant} transparent={transparent}>
      {children}
    </ButtonWrapper>
  );
};
