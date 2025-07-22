import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

import { forgotPassword } from "../util/http";
import { ForgotPassword } from "../interfaces/auth-api.interface";

export function useForgotPassword() {
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: (data: ForgotPassword) => {
      return forgotPassword(data);
    },
    onSuccess: () => {
      navigate("/success");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to send email");
    },
  });

  return { mutate, isPending };
}
