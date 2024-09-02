import styled from "@emotion/styled";
import React from "react";
import { colors, media } from "../../css/shared";
import { H1, H3, P1, P3 } from "../styled/typography";
import Logout from "../../assets/icons/logout-svgrepo-com.svg";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes";
import { Button } from "../button/button";
import { RolesType } from "../../api/task-tracker-api";
import Flex from "../flex/flex";
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

const RoleContainer = styled.div({
  position: "absolute",
  display: "flex",
  flexDirection: "row",
  width: 700,
  gap: 20,
  top: 15,
  left: 20,
  h3: {
    color: colors.white,
  },
  p: {
    color: colors.white,
  },
  button: {
    height: 30,
    width: 150,
    lineHeight: "15px",
  },
});

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
  const role = localStorage.getItem("role");
  const handleLogout = () => {
    localStorage.setItem("token", "");
    localStorage.setItem("userId", "");
    localStorage.setItem("role", "");
    navigate(ROUTES.INDEX);
  };
  return (
    <Container>
      <H1>Task tracker</H1>
      <RoleContainer>
        <P1>Вы вошли как:</P1>
        <P1>{role === "ROLE_ADMIN" ? "Админ" : "Исполнитель"}</P1>
        {role === "ROLE_ADMIN" && (
          <Button
            variant="DANGER"
            onClick={() => navigate(ROUTES.ROLE_SERVICE)}
          >
            Управление ролями
          </Button>
        )}
      </RoleContainer>
      <LogoutButton onClick={handleLogout}>
        <img src={Logout} />
      </LogoutButton>
    </Container>
  );
};
