import { useCallback, useState } from "react";

import { ErrorType } from "../types/common.ts";
import { usersApi, UserType } from "../api/task-tracker-api.ts";

export function useUsers(): {
  loading: boolean;
  error: ErrorType<"none" | "common">;
  users: UserType[];
  getUsers: () => void;
  clearError: () => void;
} {
  const [loading, setLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<UserType[]>([]);
  const [error, setError] = useState<ErrorType<"none" | "common">>({
    isActive: false,
    value: "",
    type: "none",
  });

  const getUsers = useCallback(() => {
    setLoading(true);
    usersApi
      .getAllUsers()
      .then((res) => {
        setUsers(res.data);
      })
      .catch((e) => {
        setError({
          isActive: true,
          value: e.response.data.message,
          type: "common",
        });
      })
      .finally(() => setLoading(false));
  }, []);

  const clearError = useCallback(() => {
    setError({ isActive: false, type: "none", value: "" });
  }, []);

  return {
    users,
    getUsers,
    loading,
    error,
    clearError,
  };
}
