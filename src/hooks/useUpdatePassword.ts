import { useMutation } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import { UpdatePasswordInterface } from "../interfaces/auth-api.interface";
import { updatePassword } from "../util/http";
import toast from "react-hot-toast";
import { queryClient } from "../constants/query-client.constants";
import { useState } from "react";
import { AxiosError } from "axios";

type ErrorField = keyof UpdatePasswordInterface;

function isErrorField(field: string): field is ErrorField {
  return ["currentPassword", "newPassword", "confirmPassword"].includes(field);
}

export function useUpdatePassword() {
  const { token } = useAuth();

  const [formErrors, setFormErrors] = useState<UpdatePasswordInterface>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: UpdatePasswordInterface) => {
      if (!token) throw new Error("Invalid token!");
      return updatePassword(token, data);
    },
    onSuccess: () => {
      toast.success("Password updated successfully!");
      queryClient.clear();
    },
    onError: (error: AxiosError<{ message: string[] }>) => {
      const messages = error.response?.data?.message;

      if (Array.isArray(messages)) {
        const newErrors: UpdatePasswordInterface = {
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        };
        messages.forEach((msg) => {
          const field = msg.split(" ")[0];
          if (isErrorField(field)) {
            newErrors[field] = newErrors[field]
              ? newErrors[field] + "\n" + msg
              : msg;
          }
        });

        setFormErrors(newErrors);
      }
      toast.error(error.message || "Failed to create character");
    },
  });
  return { mutate, isPending, formErrors };
}
