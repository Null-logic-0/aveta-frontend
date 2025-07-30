import { useAuth } from "./useAuth";
import { close } from "../store/UI-slice";
import { useDispatch } from "react-redux";
import { updateProfile } from "../util/http";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../constants/query-client.constants";
import { UpdateUserProfileInterface } from "../interfaces/user-profile.interface";

import toast from "react-hot-toast";

export function useUpdateProfile() {
  const { token } = useAuth();
  const dispatch = useDispatch();
  const { mutate, isPending } = useMutation({
    mutationFn: (data: UpdateUserProfileInterface) => {
      if (!token) throw new Error("Invalid credentials!");
      return updateProfile(token, data);
    },
    onSuccess: async () => {
      toast.success("Profile updated successfully");
      queryClient.invalidateQueries({ queryKey: ["me"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
      dispatch(close());
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update profile!");
    },
  });

  return { mutate, isPending };
}
