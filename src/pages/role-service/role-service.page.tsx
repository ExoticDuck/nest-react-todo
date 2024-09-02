import React, { useCallback, useEffect, useState } from "react";
import { H2, H3, P1 } from "../../components/styled/typography";

import { colors, mixins } from "../../css/shared";
import { Button } from "../../components/button/button";
import styled from "@emotion/styled";
import { Page } from "../../components/styled/common";
import CloseIcon from "../../assets/icons/close-lg-svgrepo-com.svg";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes";
import { RolesType, usersApi } from "../../api/task-tracker-api";
import { useUsers } from "../../hooks/use-users";

const Card = styled.div((_) => ({
  ...mixins.card,
  position: "relative",
  flexDirection: "column",
  gap: 30,
  width: 800,
  img: {
    height: 40,
  },
  p: {
    textAlign: "center",
  },
  border: `.8px solid ${colors.orange}`,
  boxShadow: "none",
}));
const UserCard = styled.div((_) => ({
  height: 70,
  backgroundColor: colors.grayBg,
  padding: 10,
  display: "flex",
  flexDirection: "column",
  alignItems: "space-between",
  borderRadius: "20px",
}));
const Scroll = styled.div({
  overflowY: "scroll",
  height: 600,
  display: "flex",
  flexDirection: "column",
  gap: 10,
});
const ExitButton = styled.div({
  position: "absolute",
  top: 20,
  right: 20,
  img: {
    height: 30,
  },
});
const ErrorBlock = styled.div((_) => ({
  h3: { color: colors.danger, textAlign: "center" },
}));

const RoleService: React.FC = () => {
  const navigate = useNavigate();
  const { users, getUsers, setRoleToUser } = useUsers();
  const handleSetRole = useCallback((value: RolesType, userId: number) => {
    setRoleToUser({ value: value, userId: userId });
    getUsers();
  }, []);
  useEffect(() => getUsers(), []);
  return (
    <Page>
      <Card>
        <H2>Назначить админом:</H2>
        <ExitButton onClick={() => navigate(ROUTES.TASK_LIST)}>
          <img src={CloseIcon} />
        </ExitButton>
        <Scroll>
          {!users.length && <H2>Пользователей нет</H2>}
          {!!users.length &&
            users.map((user) => {
              return (
                <UserCard key={user.id}>
                  <div>
                    <H3>{user.email}</H3>
                  </div>
                  {!!user.roles.length &&
                  user.roles[0].value === "ROLE_USER" ? (
                    <Button
                      variant="GREEN"
                      onClick={() => handleSetRole("ROLE_ADMIN", user.id)}
                    >
                      Назначить админом
                    </Button>
                  ) : (
                    <Button
                      variant="PRIMARY"
                      onClick={() => handleSetRole("ROLE_USER", user.id)}
                    >
                      Назначить исполнителем
                    </Button>
                  )}
                </UserCard>
              );
            })}
        </Scroll>
      </Card>
    </Page>
  );
};

export default RoleService;
