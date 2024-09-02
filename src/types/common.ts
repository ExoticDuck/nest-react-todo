export enum OperationStatus {
  SUCCESS = "success",
  ERROR = "error",
  IDLE = "idle",
}

export type ErrorType<T> = {
  isActive: boolean;
  value: string;
  type: T;
};

export type TaskType = "Task" | "Milestone" | "Epic";

export type Token = {
  email: string;
  exp: number;
  iat: number;
  id: number;
};
