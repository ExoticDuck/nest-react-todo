import React, { useCallback, useEffect, useState } from "react";
import { H2, H3, P1, P3 } from "../../components/styled/typography";

import {  mixins } from "../../css/shared";
import { Button } from "../../components/button/button";
import styled from "@emotion/styled";

import Gear from "../../assets/icons/gear-svgrepo-com.svg";
import CloseIcon from "../../assets/icons/close-lg-svgrepo-com.svg";
import Flex from "../../components/flex/flex";
import { TaskType } from "../../types/common";
import {
  formatDate,
  getProgressColor,
  getTaskColor,
} from "../../helpers/helpers";
import { TaskObjType, UpdateTaskRequestType } from "../../api/task-tracker-api";
import UpdateTask from "./update-task";

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
  img: {
    height: 30,
  },
}));

const Title = styled.div({
  width: "90%",
  height: 50,
  borderRadius: 10,
  display: "flex",
  alignItems: "center",
  padding: 10,
  boxSizing: "border-box",
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
  task: TaskObjType;
  isActive: boolean;
  handleCloseTask: () => void;
  handleCompleteTask: (data: UpdateTaskRequestType) => void;
  handleUpdate: (data: UpdateTaskRequestType) => void;
};


const TaskModal: React.FC<TaskPropsType> = ({
  task,
  isActive,
  handleCloseTask,
  handleCompleteTask,
  handleUpdate,
}: TaskPropsType) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedField, setSelectedField] = useState<"title" | "progress">(
    "title"
  );
  useEffect(() => {
    console.log(selectedField);
  }, [selectedField]);
  const handleUpdateTask = useCallback(
    (value: string | number) => {
      if (selectedField === "progress") {
        handleUpdate({ id: task.id, progress: Number(value) });
      } else if (selectedField === "title" && typeof value === "string") {
        handleUpdate({ id: task.id, title: value });
      }
      handleCloseTask();
    },
    [selectedField]
  );
  return (
    <Card isActive={isActive}>
      <Flex
        direction="row"
        gap={10}
        onClick={() => {
          setSelectedField("title");
          setIsModalOpen(true);
        }}
      >
        <>
          <Title>
            <H2>{task.title}</H2>
            <img
              src={Gear}
              onClick={() => {
                setSelectedField("title");
                setIsModalOpen(true);
              }}
            />
          </Title>
        </>

        <div onClick={handleCloseTask}>
          <img src={CloseIcon} />
        </div>
      </Flex>
      <Flex direction="row" justifyContent="space-between">
        <Flex direction="row" gap={3}>
          <P1>Тип задачи: </P1>
          <Type type={task.type}>
            <H3>{task.type}</H3>
          </Type>
        </Flex>
        <Flex direction="row" gap={3}>
          <P1>Срок выполнения: </P1>
          <Deadline>
            <H3>{formatDate(task.deadline)}</H3>
          </Deadline>
        </Flex>
      </Flex>
      <Flex direction="row" justifyContent="space-between">
        <Flex direction="row" gap={3}>
          <P1>Статус задачи: </P1>
          <H3>{task.status}</H3>
        </Flex>
        <Flex direction="row" gap={3}>
          <P1>Дата создания: </P1>
          <Deadline>
            <H3>{formatDate(task.createdAt)}</H3>
          </Deadline>
        </Flex>
      </Flex>
      <Flex direction="row" justifyContent="flex-end">
        <Flex direction="row" gap={3}>
          <P1>Прогресс выполнения: </P1>
          <Progress progress={task.progress}>
            <H3>{task.progress}%</H3>
          </Progress>
          <img
            src={Gear}
            onClick={() => {
              setSelectedField("progress");
              setIsModalOpen(true);
            }}
          />
        </Flex>
      </Flex>
      <Flex
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        gap={10}
      >
        <H3>Описание задачи:</H3>
        <P3>{task.description}</P3>
      </Flex>
      {task.progress !== 100 && (
        <Button
          variant="GREEN"
          style={{ marginTop: 20 }}
          onClick={() => handleCompleteTask({ id: task.id, progress: 100 })}
        >
          Завершить
        </Button>
      )}
      {isModalOpen && selectedField && (
        <UpdateTask
          isActive={isModalOpen}
          title={selectedField}
          handleUpdateTask={handleUpdateTask}
          task={task}
          value={task[selectedField]}
        />
      )}
    </Card>
  );
};

export default TaskModal;
