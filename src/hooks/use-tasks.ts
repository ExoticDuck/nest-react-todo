import { useCallback, useState } from "react";

import { ErrorType } from "../types/common.ts";
import {
  CreateTaskRequestType,
  FilterTasksRequestType,
  TaskObjType,
  tasksApi,
  UpdateTaskRequestType,
} from "../api/task-tracker-api.ts";
export function useTasks(): {
  loading: boolean;
  taskError: ErrorType<"common" | "none">;
  updateTask: (data: UpdateTaskRequestType) => void;
  createTask: (data: CreateTaskRequestType) => void;
  filterTasks: (data: FilterTasksRequestType) => void;
  deleteTask: (taskId: number) => void;
  tasks: TaskObjType[];
  getTasks: () => void;
  clearError: () => void;
} {
  const [loading, setLoading] = useState<boolean>(false);
  const [tasks, setTasks] = useState<TaskObjType[]>([]);
  const [taskError, setTaskError] = useState<ErrorType<"common" | "none">>({
    isActive: false,
    value: "",
    type: "none",
  });

  const getTasks = useCallback(() => {
    setLoading(true);
    tasksApi
      .getTasks()
      .then((res) => {
        setTasks(res.data);
      })
      .catch((e) => {
        setTaskError({
          isActive: true,
          value: e.response.data.message,
          type: "none",
        });
      })
      .finally(() => setLoading(false));
  }, []);
  const updateTask = useCallback((data: UpdateTaskRequestType) => {
    setLoading(true);
    tasksApi
      .updateTask(data)
      .then((res) => {})
      .catch((e) => {
        setTaskError({
          isActive: true,
          value: e.response.data.message,
          type: "none",
        });
      })
      .finally(() => setLoading(false));
  }, []);
  const createTask = useCallback((data: CreateTaskRequestType) => {
    setLoading(true);
    tasksApi
      .createTask(data)
      .then((res) => {})
      .catch((e) => {
        setTaskError({
          isActive: true,
          value: e.response.data.message,
          type: "none",
        });
      })
      .finally(() => setLoading(false));
  }, []);
  const filterTasks = useCallback((data: FilterTasksRequestType) => {
    setLoading(true);
    tasksApi
      .filterTasks(data)
      .then((res) => {
        setTasks(res.data);
      })
      .catch((e) => {
        setTaskError({
          isActive: true,
          value: e.response.data.message,
          type: "none",
        });
      })
      .finally(() => setLoading(false));
  }, []);
  const deleteTask = useCallback((taskId: number) => {
    setLoading(true);
    tasksApi
      .deleteTask(taskId)
      .then((res) => {})
      .catch((e) => {
        setTaskError({
          isActive: true,
          value: e.response.data.message,
          type: "none",
        });
      })
      .finally(() => setLoading(false));
  }, []);

  const clearError = useCallback(() => {
    setTaskError({ isActive: false, type: "none", value: "" });
  }, []);

  return {
    getTasks,
    updateTask,
    createTask,
    deleteTask,
    filterTasks,
    loading,
    taskError,
    tasks,
    clearError,
  };
}
