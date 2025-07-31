import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import { getAllChats } from "../util/http";

export function useFetchChats() {
  const { token } = useAuth();

  const { data, isError, error, isPending } = useQuery({
    queryKey: ["chats"],
    queryFn: () => {
      if (!token) throw new Error("Invalid credentials");
      return getAllChats(token);
    },
    retry: false,
    enabled: !!token,
  });

  return { data, isError, error, isPending };
}
