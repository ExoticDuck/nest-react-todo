import React, { useEffect, useState } from "react";
import { H2, H3 } from "../styled/typography";

import { mixins } from "../../css/shared";
import { Button } from "../button/button";
import styled from "@emotion/styled";;
import CloseIcon from "../../assets/icons/close-lg-svgrepo-com.svg";
import {
  MenuItem,
  Select,
  SelectChangeEvent,
  Slider,
  TextField,
} from "@mui/material";
import Flex from "../flex/flex";
import { ErrorType, TaskType } from "../../types/common";
import {
  FilterTasksRequestType,
} from "../../api/task-tracker-api";
import { useUsers } from "../../hooks/use-users";

const Card = styled.div<{ isActive: boolean }>((props) => ({
  ...mixins.card,
  position: "absolute",
  zIndex: 500,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  flexDirection: "column",
  width: 600,
  display: props.isActive ? "block" : "none",
  padding: "20px 50px",
  boxSizing: "border-box",
  img: {
    height: 30,
  },
}));

const CloseButton = styled.div({
  position: "absolute",
  top: 20,
  right: 50,
});

type TaskPropsType = {
  isActive: boolean;
  handleCloseModal: () => void;
  handleFilterTasks: (data: FilterTasksRequestType) => void;
};

type StatusType = "Создана" | "В работе" | "Завершена";

const FilterTasksModal: React.FC<TaskPropsType> = ({
  isActive,
  handleFilterTasks,
  handleCloseModal,
}: TaskPropsType) => {
  const { users, getUsers, error: userError } = useUsers();

  const [result, setResult] = useState<FilterTasksRequestType>({});
  const [error, setError] = useState<ErrorType<"none" | "common">>({
    type: "none",
    isActive: false,
    value: "",
  });
  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setResult({ ...result, progress: Number(newValue) });
  };

  const handleStatusSelectChange = (event: SelectChangeEvent) => {
    setResult({ ...result, status: event.target.value as StatusType });
  };
  const handleTypeSelectChange = (event: SelectChangeEvent) => {
    setResult({ ...result, type: event.target.value as TaskType });
  };
  const handleUserSelectChange = (event: SelectChangeEvent) => {
    setResult({ ...result, userId: Number(event.target.value) });
  };

  const handleSubmit = () => {
    handleFilterTasks(result);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Card isActive={isActive}>
      <Flex direction="column" gap={20} alignItems="center">
        <H2>Отфильтровать задачи</H2>
        <CloseButton onClick={handleCloseModal}>
          <img src={CloseIcon} />
        </CloseButton>
        <TextField
          label={"Название"}
          fullWidth
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setResult({ ...result, title: event.target.value });
          }}
        />
        <Select
          id="type-select"
          fullWidth
          onChange={handleTypeSelectChange}
        >
          <MenuItem value={"Task"}>
            <H3>Task</H3>
          </MenuItem>
          <MenuItem value={"Milestone"}>
            <H3>Milestone</H3>
          </MenuItem>
          <MenuItem value={"Epic"}>
            <H3>Epic</H3>
          </MenuItem>
        </Select>
        <Select
          id="status-select"
          fullWidth
          onChange={handleStatusSelectChange}
        >
          <MenuItem value={"Создана"}>
            <H3>Создана</H3>
          </MenuItem>
          <MenuItem value={"В работе"}>
            <H3>В работе</H3>
          </MenuItem>
          <MenuItem value={"Завершена"}>
            <H3>Завершена</H3>
          </MenuItem>
        </Select>
        {!!users.length && (
          <Select
            id="user-select"
            fullWidth
            onChange={handleUserSelectChange}
          >
            {users &&
              users.map((user) => (
                <MenuItem value={user.id} key={user.id}>
                  <H3>{user.email}</H3>
                </MenuItem>
              ))}
          </Select>
        )}

        <Flex direction="column" justifyContent="flex-start">
          <div>
            <H3>Дата окончания</H3>
          </div>
          <TextField
            type="date"
            fullWidth
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setResult({ ...result, deadline: event.target.value });
            }}
          />
        </Flex>
        <H3>Прогресс</H3>
        <Slider
          onChange={handleSliderChange}
          valueLabelDisplay="auto"
          min={0}
          max={100}
        />
        <TextField
          label={"Описание"}
          fullWidth
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setResult({ ...result, description: event.target.value });
          }}
        />
        <Button variant="PRIMARY" onClick={handleSubmit}>
          Отфильтровать
        </Button>
      </Flex>
    </Card>
  );
};

export default FilterTasksModal;
