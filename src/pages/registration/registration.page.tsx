import React, { useCallback, useState } from "react";
import { H3 } from "../../components/styled/typography";

import { colors, mixins } from "../../css/shared";
import { Button } from "../../components/button/button";
import styled from "@emotion/styled";
import { Page } from "../../components/styled/common";
import RegisterIcon from "../../assets/icons/user-add-svgrepo-com.svg";
import ExitIcon from "../../assets/icons/exit-svgrepo-com.svg";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/use-auth";
import { validateEmail } from "../../helpers/helpers";
import { ErrorType } from "../../types/common";
import { ROUTES } from "../../routes";

const Card = styled.div((_) => ({
  ...mixins.card,
  position: "relative",
  flexDirection: "column",
  width: 400,
  img: {
    height: 40,
  },
  p: {
    textAlign: "center",
  },
}));
const BackButton = styled.div((_) => ({
  position: "absolute",
  right: 20,
  top: 20,
  height: 40,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  img: {
    height: 25,
  },
}));
const ErrorBlock = styled.div((_) => ({
  h3: { color: colors.danger, textAlign: "center" },
}));

const Registration: React.FC = () => {
  const navigate = useNavigate();
  const { registerUser, authError, clearError } = useAuth();

  const [error, setError] = useState<
    ErrorType<"none" | "email" | "password" | "common">
  >({
    isActive: false,
    value: "",
    type: "none",
  });
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleRegistration = useCallback(() => {
    if (authError.isActive && authError.type === "registration") {
      clearError();
    }
    if (password !== confirmPassword) {
      setError({
        isActive: true,
        value: "Введенные пароли не совпадают!",
        type: "password",
      });
      return;
    } else if (password === "" || confirmPassword === "") {
      setError({
        isActive: true,
        value: "Поле пароля не может быть пустым!",
        type: "password",
      });
      return;
    } else if (!validateEmail(email) || email === "") {
      setError({
        isActive: true,
        value: "Введите корректный email!",
        type: "email",
      });
      return;
    }
    registerUser({ email: email, password: password });
  }, [email, password, confirmPassword]);

  return (
    <Page>
      <Card>
        <img src={RegisterIcon} alt="icon" />
        <BackButton onClick={() => navigate(ROUTES.INDEX)}>
          <img src={ExitIcon} alt="icon" />
        </BackButton>
        {error.isActive && (
          <ErrorBlock>
            <H3>{error.value}</H3>
          </ErrorBlock>
        )}
        {authError.isActive && (
          <ErrorBlock>
            <H3>{authError.value}</H3>
          </ErrorBlock>
        )}
        <TextField
          label={"Email"}
          value={email}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setEmail(event.target.value);
            if (error.isActive && error.type === "email") {
              setError({ isActive: false, value: "", type: "none" });
            }
          }}
        />
        <TextField
          label={"Пароль"}
          value={password}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(event.target.value);
            if (error.isActive && error.type === "password") {
              setError({ isActive: false, value: "", type: "none" });
            }
          }}
        />
        <TextField
          label={"Подтвердите пароль"}
          value={confirmPassword}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setConfirmPassword(event.target.value);
            if (error.isActive && error.type === "password") {
              setError({ isActive: false, value: "", type: "none" });
            }
          }}
        />
        <Button variant="PRIMARY" onClick={handleRegistration}>
          Зарегестрироваться
        </Button>
      </Card>
    </Page>
  );
};

export default Registration;
