import styled from "@emotion/styled";
import React from "react";
import { colors, media } from "../../css/shared";
import { H1 } from "../styled/typography";
import Logout from "../../assets/icons/logout-svgrepo-com.svg";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes";
const Container = styled.header((_) => ({
  display: "flex",
  flexDirection: "column",
  position: "fixed",
  top: 0,
  backgroundColor: colors.lightblue,
  h1: {
    color: colors.white,
    margin: 0,
  },

  [media.desktop]: {
    width: "100%",
    padding: "15px 0px",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
    zIndex: 800,
  },
}));

const LogoutButton = styled.div({
  position: "absolute",
  top: 15,
  right: 20,
  img: {
    height: 30,
  },
});

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.setItem("token", "");
    localStorage.setItem("userId", "");
    navigate(ROUTES.INDEX);
  };
  return (
    <Container>
      <H1>Task tracker</H1>
      <LogoutButton onClick={handleLogout}>
        <img src={Logout} />
      </LogoutButton>
    </Container>
  );
};
