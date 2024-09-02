import React, { PropsWithChildren, HTMLProps } from "react";

interface FlexProps {
  gap?: number;
  justifyContent?: "space-between" | "flex-start" | "flex-end" | "space-around";
  alignItems?: "center" | "flex-start";
  direction?: "row" | "column";
}

export const Flex: React.FC<
  PropsWithChildren<FlexProps> & HTMLProps<HTMLDivElement>
> = ({
  gap = 0,
  justifyContent = "flex-start",
  alignItems = "center",
  direction = "row",
  children,
  style,
  className,
  id,
}) => {
  return (
    <div
      className={className}
      id={id}
      style={{
        ...style,
        display: "flex",
        gap,
        justifyContent,
        alignItems,
        flexDirection: direction,
      }}
    >
      {children}
    </div>
  );
};

export default Flex;
