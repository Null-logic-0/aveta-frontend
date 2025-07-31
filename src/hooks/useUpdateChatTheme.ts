import { useMutation } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import { updateChatTheme } from "../util/http";
import { UpdateChatThemeInterface } from "../interfaces/chat.interface";
import { queryClient } from "../constants/query-client.constants";
import toast from "react-hot-toast";

export function useUpdateChatTheme({ id }: { id: number }) {
  const { token } = useAuth();

  const { mutate } = useMutation({
    mutationFn: (data: UpdateChatThemeInterface) => {
      if (!token) throw new Error("Invalid credentials!");
      return updateChatTheme(token, id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chat", id] });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update chat theme!");
    },
  });

  return { mutate };
}
