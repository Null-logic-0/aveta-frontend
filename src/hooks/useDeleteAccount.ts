import { useAuth } from "./useAuth";
import { deleteAccount } from "../util/http";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { queryClient } from "../constants/query-client.constants";
import { useDispatch } from "react-redux";
import { clearAuth } from "../store/auth-slice";

export function useDeleteAccount() {
  const { token } = useAuth();
  const dispatch = useDispatch();

  const { mutate, isPending } = useMutation({
    mutationFn: () => {
      if (!token) throw new Error("No token provided");
      return deleteAccount(token);
    },
    onSuccess: () => {
      toast.success("Account deleted successfully!");
      queryClient.clear();
      dispatch(clearAuth());
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete account!");
    },
  });

  return { mutate, isPending };
}
