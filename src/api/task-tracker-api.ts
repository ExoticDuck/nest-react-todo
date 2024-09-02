import axios, { AxiosResponse } from "axios";
import { TaskType } from "../types/common";
const instance = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

export const authApi = {
  login(data: LoginParamsType) {
    return instance.post<LoginParamsType, AxiosResponse<LoginResponseType>>(
      `/auth/login`,
      data
    );
  },
  registration(data: RegistrationParamsType) {
    return instance.post<
      RegistrationParamsType,
      AxiosResponse<RegistrationResponseType>
    >(`/auth/registration`, data);
  },
};
export const tasksApi = {
  getTasks() {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    return instance.get<{}, AxiosResponse<GetTasksResponseType>>(
      `/tasks/${userId}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
  },
  updateTask(data: UpdateTaskRequestType) {
    const token = localStorage.getItem("token");
    return instance.put<UpdateTaskRequestType, AxiosResponse<TaskObjType>>(
      `/tasks`,
      data,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
  },
  createTask(data: CreateTaskRequestType) {
    const token = localStorage.getItem("token");
    return instance.post<CreateTaskRequestType, AxiosResponse<TaskObjType>>(
      `/tasks`,
      data,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
  },
  deleteTask(taskId: number) {
    const token = localStorage.getItem("token");
    return instance.delete<{}, AxiosResponse<{}>>(`/tasks/${taskId}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  },
  filterTasks(data: FilterTasksRequestType) {
    const token = localStorage.getItem("token");
    return instance.post<FilterTasksRequestType, AxiosResponse<TaskObjType[]>>(
      `/tasks/filter`,
      data,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
  },
};
export const usersApi = {
  getAllUsers() {
    const token = localStorage.getItem("token");
    return instance.get<{}, AxiosResponse<GetUsersResponseType>>(`/users`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  },
};

//Auth
export type LoginParamsType = {
  email: string;
  password: string;
};
export type LoginResponseType = {
  token: string;
};
export type RegistrationParamsType = {
  email: string;
  password: string;
};
export type RegistrationResponseType = {
  token: string;
};

//Tasks
export type GetTasksResponseType = TaskObjType[];

export type StatusType = "Создана" | "В работе" | "Завершена";

export type UpdateTaskRequestType = {
  id: number;
  userId?: number;
  title?: string;
  status?: StatusType;
  deadline?: string;
  progress?: number;
  type?: TaskType;
  description?: string;
};

export type CreateTaskRequestType = {
  title: string;
  status: StatusType;
  userId: number;
  type: TaskType;
  progress: Number;
  deadline: string;
  description: string;
};
export type FilterTasksRequestType = {
  title?: string;
  status?: StatusType;
  userId?: number;
  type?: TaskType;
  progress?: Number;
  deadline?: string;
  description?: string;
};

export type TaskObjType = {
  id: number;
  userId: number;
  title: string;
  status: StatusType;
  deadline: string;
  progress: number;
  type: TaskType;
  description: string;
  createdAt: string;
  updatedAt: string;
};

//Users
export type GetUsersResponseType = UserType[];
export type UserType = {
  id: number;
  email: string;
  password: string;
};
