import { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setAuth } from "../store/auth-slice";
import { useMutation } from "@tanstack/react-query";
import { AuthResponse } from "../interfaces/auth-api.interface";
import { queryClient } from "../constants/query-client.constants";
import { ErrorResponse } from "../interfaces/error-response.interface";
import toast from "react-hot-toast";

export function useAuthMutation<Req>(
  mutationFn: (data: Req) => Promise<AuthResponse>,
  options?: {
    redirectTo?: string;
    errorMessage?: string;
  }
) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const { mutate, isPending, isError, error, data } = useMutation({
    mutationFn,
    onSuccess: (response) => {
      const { tokens } = response.data;

      dispatch(
        setAuth({
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
        })
      );
      queryClient.invalidateQueries({ queryKey: ["me"] });
      setFormErrors({});

      if (options?.redirectTo) {
        navigate(options.redirectTo);
      }
    },
    onError: (err: Error & { code?: number; info?: unknown }) => {
      if (err.info && typeof err.info === "object" && "message" in err.info) {
        const message = (err.info as ErrorResponse).message;

        const errorObj: Record<string, string> = {};

        if (Array.isArray(message)) {
          message.forEach((msg) => {
            if (msg.toLowerCase().includes("username")) errorObj.userName = msg;
            else if (msg.toLowerCase().includes("email")) errorObj.email = msg;
            else if (msg.toLowerCase().includes("passwordconfirm"))
              errorObj.passwordConfirm = msg;
            else if (msg.toLowerCase().includes("password"))
              errorObj.password = msg;
            else errorObj.general = msg;
          });
        } else if (typeof message === "string") {
          const lower = message.toLowerCase();
          if (lower.includes("email")) errorObj.email = message;
          else errorObj.general = message;
        }

        setFormErrors(errorObj);
      }
      toast.error(err.message);
    },
  });

  return { mutate, isPending, isError, error, data, formErrors };
}
