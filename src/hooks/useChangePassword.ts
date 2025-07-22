import { useMutation } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router";
import toast from "react-hot-toast";

import { changePassword } from "../util/http";
import { ChangePassword } from "../interfaces/auth-api.interface";

export function useChangePassword() {
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();
  const token = searchParams.get("token");

  const { mutate, isPending } = useMutation({
    mutationFn: (data: ChangePassword) => {
      if (!token) throw new Error("Invalid token!");
      console.log(token);
      return changePassword(data, token);
    },
    onSuccess: () => {
      navigate("/sign-in");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to change password");
    },
  });

  return { mutate, isPending };
}
