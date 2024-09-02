import { StatusType } from "../api/task-tracker-api";
import { colors } from "../css/shared";
import { TaskType } from "../types/common";

export const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const getTaskColor = (type: TaskType) => {
  switch (type) {
    case "Task":
      return colors.lightblue;
    case "Epic":
      return colors.orange;
    case "Milestone":
      return colors.green;
    default:
      break;
  }
};
export const getProgressColor = (progress: number) => {
  if (progress >= 0 && progress < 30) {
    return "#f22b29";
  } else if (progress >= 30 && progress < 60) {
    return "#f49d37";
  } else if (progress >= 60 && progress < 90) {
    return "#fcff4b";
  } else if (progress >= 90 && progress < 100) {
    return "#85FF9E";
  } else {
    return "#8ac926";
  }
};

export const formatDate = (date: string) => {
  return new Date(date).toLocaleString().slice(0, 10);
};

export const validateCreationData = (
  title: string,
  date: string,
  description: string,
  userId: number | null
) => {
  if (title === "" || date === "" || description === "" || userId === null) {
    return false;
  }
  return true;
};
