import { useMutation } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import { createChat } from "../util/http";
import { queryClient } from "../constants/query-client.constants";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export function useCreateChat({ id }: { id: number }) {
  const { token } = useAuth();
  const navigate = useNavigate();

  const { mutate, isPending, data } = useMutation({
    mutationFn: () => {
      if (!token) throw new Error("Invalid credentials!");
      return createChat(token, id);
    },
    onSuccess: (data) => {
      const chatId = data?.data.chat.id;
      if (chatId) {
        navigate(`/chat/${chatId}`);
      }
      queryClient.invalidateQueries({ queryKey: ["characters"] });
      queryClient.invalidateQueries({ queryKey: ["chats"] });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create chat!");
    },
  });

  return { mutate, isPending, data };
}
