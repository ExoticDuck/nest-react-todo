import React, { useCallback, useEffect, useState } from "react";
import { H1, H4 } from "../../components/styled/typography";

import { mixins } from "../../css/shared";
import { Button } from "../../components/button/button";
import styled from "@emotion/styled";
import { Page } from "../../components/styled/common";
import Delete from "../../assets/icons/trash-xmark-svgrepo-com.svg";
import Flex from "../../components/flex/flex";
import { TaskType } from "../../types/common";
import {
  formatDate,
  getProgressColor,
  getTaskColor,
} from "../../helpers/helpers";
import { useTasks } from "../../hooks/use-tasks";
import {
  CreateTaskRequestType,
  FilterTasksRequestType,
  TaskObjType,
  UpdateTaskRequestType,
} from "../../api/task-tracker-api";
import TaskModal from "../../components/task/task";
import CreateTaskModal from "../../components/task/create-task";
import FilterTasksModal from "../../components/task/filter-tasks";

const Card = styled.div((_) => ({
  ...mixins.card,
  position: "relative",
  flexDirection: "column",
  minWidth: `calc(100% - 100px)`,
  minHeight: `calc(100vh - 300px)`,
  img: {
    height: 40,
  },
  p: {
    textAlign: "center",
  },
}));
const Heading = styled.div((_) => ({
  height: 70,
  button: {
    whiteSpace: "nowrap",
  },
}));
const Task = styled.div((_) => ({
  height: 50,
  div: {
    height: 50,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    padding: 10,
    boxSizing: "border-box",
  },
  border: ".8px solid lightgrey",
  borderRadius: 10,
}));
const Title = styled.div({
  width: "20%",
});
const Type = styled.div<{ type: TaskType }>((props) => ({
  width: "20%",
  backgroundColor: getTaskColor(props.type),
}));
const Executor = styled.div({
  width: "20%",
});
const Progress = styled.div<{ progress: number }>((props) => ({
  width: "20%",
  backgroundColor: getProgressColor(props.progress),
}));
const Deadline = styled.div({
  width: "20%",
});
const DeleteButton = styled.div({
  img: {
    height: 30,
  },
});

const Scroll = styled.div({
  overflowY: "scroll",
  height: 600,
  display: "flex",
  flexDirection: "column",
  gap: 10,
});
const TaskList: React.FC = () => {
  const {
    getTasks,
    getAllTasks,
    updateTask,
    createTask,
    deleteTask,
    filterTasks,
    tasks,
  } = useTasks();
  const [isUpdateModalActive, setIsUpdateModalActive] =
    useState<boolean>(false);
  const [isCreateModalActive, setIsCreateModalActive] =
    useState<boolean>(false);
  const [isFilterModalActive, setIsFilterModalActive] =
    useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<TaskObjType | null>(null);
  const role = localStorage.getItem("role");
  const userId = localStorage.getItem("userId");

  const fetchTasksByRole = useCallback(() => {
    if (role === "ROLE_USER") {
      getTasks();
    } else if (role === "ROLE_ADMIN") {
      getAllTasks();
    }
  }, [role]);

  const handleOpenTask = useCallback((task: TaskObjType) => {
    setIsUpdateModalActive(true);
    setSelectedTask(task);
  }, []);

  const handleCloseTask = useCallback(() => {
    setIsUpdateModalActive(false);
    setSelectedTask(null);
  }, []);

  const handleCloseCreate = useCallback(() => {
    setIsCreateModalActive(false);
  }, []);
  const handleCloseFilter = useCallback(() => {
    setIsFilterModalActive(false);
  }, []);

  const handleCompleteTask = useCallback((data: UpdateTaskRequestType) => {
    updateTask({ id: data.id, progress: 100, status: "Завершена" });
    fetchTasksByRole();
    setIsUpdateModalActive(false);
  }, []);

  const handleCreateTask = useCallback((data: CreateTaskRequestType) => {
    createTask({ ...data });
    fetchTasksByRole();
    setIsCreateModalActive(false);
  }, []);

  const handleFilterTasks = useCallback((data: FilterTasksRequestType) => {
    filterTasks({ ...data });
    setIsFilterModalActive(false);
  }, []);

  const handleUpdate = useCallback((data: UpdateTaskRequestType) => {
    updateTask({ ...data });
    fetchTasksByRole();
    setIsUpdateModalActive(false);
  }, []);

  const handleDeleteTask = useCallback((taskId: number) => {
    deleteTask(taskId);
    fetchTasksByRole();
  }, []);
  const getUserName = useCallback((executor: { id: number; email: string }) => {
    if (userId && userId === executor.id.toString()) {
      return "Вы";
    }
    return executor.email;
  }, []);

  useEffect(() => {
    fetchTasksByRole();
  }, []);
  return (
    <Page>
      <Card>
        <Heading>
          <Flex justifyContent="space-between" direction="row">
            <H1>Список задач</H1>
            <Flex direction="row" gap={20}>
              <Button
                variant="GREEN"
                onClick={() => setIsFilterModalActive(true)}
              >
                Настроить фильтр
              </Button>
              <Button
                variant="PRIMARY"
                onClick={() => setIsCreateModalActive(true)}
                disabled={role === "ROLE_USER"}
              >
                Создать задачу
              </Button>
            </Flex>
          </Flex>
        </Heading>
        <Scroll>
          {!!tasks.length &&
            tasks.map((task) => {
              const date = formatDate(task.deadline);
              const handleRemoveTask = (taskId: number) => {
                handleDeleteTask(taskId);
              };
              return (
                <Task key={task.id} onDoubleClick={() => handleOpenTask(task)}>
                  <Flex direction="row" gap={10}>
                    <Title>
                      <H4>{task.title}</H4>
                    </Title>
                    <Type type={task.type}>
                      <H4>{task.type}</H4>
                    </Type>

                    <Executor>
                      {task.executor && <H4>{getUserName(task.executor)}</H4>}
                    </Executor>
                    <Progress progress={task.progress}>
                      <H4>{task.progress}%</H4>
                    </Progress>
                    <Deadline>
                      <H4>{date}</H4>
                    </Deadline>
                    <DeleteButton onClick={() => handleRemoveTask(task.id)}>
                      <img src={Delete} />
                    </DeleteButton>
                  </Flex>
                </Task>
              );
            })}
          {!tasks.length && <H1>Задач нет.</H1>}
        </Scroll>

        {selectedTask && isUpdateModalActive && (
          <TaskModal
            isActive={isUpdateModalActive}
            task={selectedTask}
            handleCloseTask={handleCloseTask}
            handleCompleteTask={handleCompleteTask}
            handleUpdate={handleUpdate}
          />
        )}
        {isCreateModalActive && (
          <CreateTaskModal
            isActive={isCreateModalActive}
            handleCloseModal={handleCloseCreate}
            handleCreate={handleCreateTask}
          />
        )}
        {isFilterModalActive && (
          <FilterTasksModal
            isActive={isFilterModalActive}
            handleCloseModal={handleCloseFilter}
            handleFilterTasks={handleFilterTasks}
          />
        )}
      </Card>
    </Page>
  );
};

export default TaskList;
