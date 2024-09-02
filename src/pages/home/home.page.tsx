import React from "react";
import { P2 } from "../../components/styled/typography";
import styled from "@emotion/styled";
import { mixins } from "../../css/shared";
import { Button } from "../../components/button/button";
import TaskIcon from "../../assets/icons/task-square-svgrepo-com.svg";
import { useNavigate } from "react-router-dom";
import { Page } from "../../components/styled/common";

const Card = styled.div((_) => ({
  ...mixins.card,
  flexDirection: "column",
  width: 400,
  img: {
    height: 40,
  },
  p: {
    textAlign: "center",
  },
}));

const Home: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Page>
      <Card>
        <img src={TaskIcon} alt="icon" />
        <P2>
          Упрощайте управление своим временем с помощью приложения таск трекера.
          Он помогает быстро создавать задачи, отслеживать прогресс и эффективно
          использовать свое рабочее время.
        </P2>
        <Button variant="PRIMARY" onClick={() => navigate("/login")}>
          Войти
        </Button>
        <Button variant="SECONDARY" onClick={() => navigate("/registration")}>
          Регистрация
        </Button>
      </Card>
    </Page>
  );
};

export default Home;
