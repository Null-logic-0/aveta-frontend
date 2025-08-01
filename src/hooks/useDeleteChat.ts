import { useMutation } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import { deleteChat } from "../util/http";
import { useLocation, useNavigate } from "react-router";
import { queryClient } from "../constants/query-client.constants";

import toast from "react-hot-toast";

export function useDeleteChat({ id }: { id: number }) {
  const { token } = useAuth();
  const { pathname } = useLocation();

  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: () => {
      if (!token) throw new Error("Invalidate credentials!");
      return deleteChat(token, id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chats"] });
      queryClient.invalidateQueries({ queryKey: ["chat", id] });
      if (pathname === `/chat/${id}`) {
        navigate("/");
      }
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete chat!");
    },
  });

  return { mutate, isPending };
}
