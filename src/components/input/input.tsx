import React, { HTMLProps } from "react";

import { InputWrapper } from "../styled/input";

export const Input: React.FC<
  HTMLProps<HTMLInputElement> & { error?: boolean; errorText?: string }
> = (props) => {
  const { error = false, errorText } = props;
  return (
    <InputWrapper error={error}>
      <input {...props} />
      <label htmlFor={props.id}>{props.placeholder}</label>
      {error && !!errorText && <span>{errorText}</span>}
    </InputWrapper>
  );
};
