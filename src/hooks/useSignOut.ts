import { useMutation } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import { signout } from "../util/http";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { clearAuth } from "../store/auth-slice";
import { queryClient } from "../constants/query-client.constants";

export function useSignOut() {
  const { token } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      if (!token) throw new Error("No token provided");
      return signout(token);
    },
    onSuccess: () => {
      dispatch(clearAuth());
      queryClient.removeQueries({ queryKey: ["me"] });
      navigate("/sign-in");
    },

    onError: (error) => {
      toast.error(error.message || "Failed to logout!");
    },
  });

  return { mutate, isPending };
}
