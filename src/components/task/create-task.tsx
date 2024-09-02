import React, { useEffect, useState } from "react";
import { H2, H3 } from "../../components/styled/typography";

import { mixins } from "../../css/shared";
import { Button } from "../../components/button/button";
import styled from "@emotion/styled";
import CloseIcon from "../../assets/icons/close-lg-svgrepo-com.svg";
import {
  MenuItem,
  Select,
  SelectChangeEvent,
  Slider,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Flex from "../../components/flex/flex";
import { ErrorType, TaskType } from "../../types/common";
import {
  getProgressColor,
  getTaskColor,
} from "../../helpers/helpers";
import {
  CreateTaskRequestType,
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
  //   height: 500,
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
const Type = styled.div<{ type: TaskType }>((props) => ({
  width: "fit-content",
  height: 30,
  borderRadius: 10,
  display: "flex",
  alignItems: "center",
  padding: 8,
  boxSizing: "border-box",
  backgroundColor: getTaskColor(props.type),
}));
const Executor = styled.div({
  width: "20%",
  height: 50,
  borderRadius: 10,
  display: "flex",
  alignItems: "center",
  padding: 10,
  boxSizing: "border-box",
});
const Progress = styled.div<{ progress: number }>((props) => ({
  width: "fit-content",
  height: 30,
  borderRadius: 10,
  display: "flex",
  alignItems: "center",
  padding: 8,
  boxSizing: "border-box",
  backgroundColor: getProgressColor(props.progress),
}));
const Deadline = styled.div({
  width: "20%",
  height: 50,
  borderRadius: 10,
  display: "flex",
  alignItems: "center",
  padding: 10,
  boxSizing: "border-box",
});

type TaskPropsType = {
  isActive: boolean;
  handleCloseModal: () => void;
  handleCreate: (data: CreateTaskRequestType) => void;
};

type StatusType = "Создана" | "В работе" | "Завершена";

const CreateTaskModal: React.FC<TaskPropsType> = ({
  isActive,
  handleCreate,
  handleCloseModal,
}: TaskPropsType) => {
  const navigate = useNavigate();
  const { users, getUsers, error: userError } = useUsers();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<StatusType>("Создана");
  const [type, setType] = useState<TaskType>("Task");
  const [userId, setUserId] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<ErrorType<"none" | "common">>({
    type: "none",
    isActive: false,
    value: "",
  });
  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setProgress(Number(newValue) as number);
  };

  const handleStatusSelectChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as StatusType);
  };
  const handleTypeSelectChange = (event: SelectChangeEvent) => {
    setType(event.target.value as TaskType);
  };
  const handleUserSelectChange = (event: SelectChangeEvent) => {
    setUserId(Number(event.target.value));
  };

  const handleSubmit = () => {
    handleCreate({
      title: title,
      deadline: date,
      description: description,
      progress: progress,
      status: status as StatusType,
      type: type,
      userId: userId ?? 0,
    });
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Card isActive={isActive}>
      <Flex direction="column" gap={20} alignItems="center">
        <H2>Создать задачу</H2>
        <CloseButton onClick={handleCloseModal}>
          <img src={CloseIcon} />
        </CloseButton>
        <TextField
          label={"Название"}
          value={title}
          fullWidth
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setTitle(event.target.value);
          }}
        />
        <Select
          id="type-select"
          value={type}
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
          value={status}
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
            <H3>Завершенае</H3>
          </MenuItem>
        </Select>
        {!!users.length && (
          <Select
            id="user-select"
            value={userId?.toString()}
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
            value={date}
            fullWidth
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setDate(event.target.value);
            }}
          />
        </Flex>
        <H3>Прогресс</H3>
        <Slider
          onChange={handleSliderChange}
          value={Number(progress)}
          valueLabelDisplay="auto"
          min={0}
          max={100}
        />
        <TextField
          label={"Описание"}
          value={description}
          fullWidth
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setDescription(event.target.value);
          }}
        />
        <Button variant="GREEN" onClick={handleSubmit}>
          Создать
        </Button>
      </Flex>
    </Card>
  );
};

export default CreateTaskModal;
