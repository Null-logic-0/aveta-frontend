import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import { fetchChatMessages } from "../util/http";

export function useFetchChatMessages({ id }: { id: number }) {
  const { token } = useAuth();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["chat-messages", id],
    queryFn: () => {
      if (!token) throw new Error("Invalid credentials!");
      return fetchChatMessages(token, id);
    },

    retry: false,
    enabled: !!token && !!id,
  });

  return { data, isError, error, isPending };
}
