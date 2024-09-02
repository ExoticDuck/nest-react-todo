import React, { useState } from "react";
import { H2 } from "../../components/styled/typography";

import { mixins } from "../../css/shared";
import { Button } from "../../components/button/button";
import styled from "@emotion/styled";
import { Slider, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { TaskType } from "../../types/common";
import { getProgressColor, getTaskColor } from "../../helpers/helpers";
import { TaskObjType } from "../../api/task-tracker-api";

const Card = styled.div<{ isActive: boolean }>((props) => ({
  ...mixins.card,
  position: "absolute",
  zIndex: 600,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  flexDirection: "column",
  width: 300,
  display: props.isActive ? "block" : "none",
  img: {
    height: 30,
  },
}));

type TaskPropsType = {
  task: TaskObjType;
  isActive: boolean;
  title: "title" | "progress";
  value: string | number;
  handleUpdateTask: (value: string | number) => void;
};

const UpdateTask: React.FC<TaskPropsType> = ({
  task,
  isActive,
  title,
  value,
  handleUpdateTask,
}: TaskPropsType) => {
  const navigate = useNavigate();
  const [updatedValue, setUpdatedValue] = useState(value);
  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setUpdatedValue(Number(newValue) as number);
  };
  return (
    <Card isActive={isActive}>
      <H2>{title === "title" ? "Название" : "Прогресс"}</H2>
      {title === "title" && (
        <>
          <TextField
            label={"Email"}
            value={updatedValue}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setUpdatedValue(event.target.value);
            }}
          />
        </>
      )}
      {title === "progress" && (
        <Slider
          onChange={handleSliderChange}
          value={Number(updatedValue)}
          valueLabelDisplay="auto"
          min={0}
          max={100}
        />
      )}

      <Button
        variant="PRIMARY"
        style={{ marginTop: 20 }}
        onClick={() => handleUpdateTask(updatedValue)}
      >
        Обновить
      </Button>
    </Card>
  );
};

export default UpdateTask;
