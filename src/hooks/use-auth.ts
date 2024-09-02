import { useCallback, useState } from "react";

import { ErrorType, Token } from "../types/common.ts";
import {
  authApi,
  LoginParamsType,
  RegistrationParamsType,
} from "../api/task-tracker-api.ts";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { ROUTES } from "../routes/index.tsx";

export function useAuth(): {
  loading: boolean;
  authError: ErrorType<"none" | "login" | "registration">;
  registerUser: (data: RegistrationParamsType) => void;
  login: (data: LoginParamsType) => void;
  clearError: () => void;
} {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [authError, setAuthError] = useState<
    ErrorType<"none" | "login" | "registration">
  >({ isActive: false, value: "", type: "none" });

  const registerUser = useCallback((data: RegistrationParamsType) => {
    setLoading(true);
    authApi
      .registration(data)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        const decodedToken: Token = jwtDecode(res.data.token);
        localStorage.setItem("userId", decodedToken.id.toString());
        navigate(ROUTES.TASK_LIST);
      })
      .catch((e) => {
        setAuthError({
          isActive: true,
          value: e.response.data.message,
          type: "registration",
        });
      })
      .finally(() => setLoading(false));
  }, []);
  const login = useCallback((data: LoginParamsType) => {
    setLoading(true);
    authApi
      .login(data)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        const decodedToken: Token = jwtDecode(res.data.token);
        localStorage.setItem("userId", decodedToken.id.toString());
        navigate("/tasks");
      })
      .catch((e) => {
        setAuthError({
          isActive: true,
          value: e.response.data.message,
          type: "registration",
        });
      })
      .finally(() => setLoading(false));
  }, []);
  const clearError = useCallback(() => {
    setAuthError({ isActive: false, type: "none", value: "" });
  }, []);

  return {
    registerUser,
    login,
    loading,
    authError,
    clearError,
  };
}
