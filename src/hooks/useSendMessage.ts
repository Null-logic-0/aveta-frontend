import { useMutation } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import { sendMessage } from "../util/http";
import {
  ChatMessagesCache,
  SendMessageInterface,
} from "../interfaces/chat.interface";
import { queryClient } from "../constants/query-client.constants";
import toast from "react-hot-toast";

export function useSendMessage({ id }: { id: number }) {
  const { token, data } = useAuth();
  const user = data?.data.data;

  const { mutate, isPending } = useMutation({
    mutationFn: (data: SendMessageInterface) => {
      if (!token) throw new Error("Invalid credentials!");
      return sendMessage(token, id, data);
    },

    onMutate: async (newMessage) => {
      await queryClient.cancelQueries({ queryKey: ["chat-messages", id] });

      const previous = queryClient.getQueryData(["chat-messages", id]);

      const optimisticUserMessage = {
        id: Date.now(),
        content: newMessage.content,
        user: { userName: user?.userName, profileImage: user?.profileImage },
        character: null,
        createdAt: new Date().toISOString(),
        optimistic: true,
      };

      const optimisticCharacterTyping = {
        id: Date.now() + 1,
        user: null,
        createdAt: new Date().toISOString(),
        optimistic: true,
        isTyping: true,
      };

      queryClient.setQueryData(
        ["chat-messages", id],
        (old: ChatMessagesCache) => ({
          ...old,
          data: [
            ...(old?.data || []),
            optimisticUserMessage,
            optimisticCharacterTyping,
          ],
        })
      );

      return { previous };
    },

    onSuccess: (serverMessage) => {
      queryClient.setQueryData(
        ["chat-messages", id],
        (old: ChatMessagesCache) => {
          if (!old?.data) return old;

          const updated = [...old.data];

          const userIndex = updated.findIndex((m) => m.optimistic && m.user);
          if (userIndex !== -1) {
            updated[userIndex] = serverMessage;
          } else {
            updated.push(serverMessage);
          }

          return {
            ...old,
            data: updated,
          };
        }
      );

      queryClient.invalidateQueries({ queryKey: ["chat-messages", id] });
    },

    onError: (_err, _newMessage, context) => {
      queryClient.setQueryData(["chat-messages", id], context?.previous);
      toast.error("Failed to send message.");
    },
  });

  return { mutate, isPending };
}
