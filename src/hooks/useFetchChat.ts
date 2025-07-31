import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import { getSingleChat } from "../util/http";

export function useFetchChat({ id }: { id: number }) {
  const { token } = useAuth();

  const { data, isError, error, isPending } = useQuery({
    queryKey: ["chat", id],
    queryFn: () => {
      if (!token) throw new Error("Invalid credentials!");
      return getSingleChat(token, id);
    },

    retry: false,
    enabled: !!id || !!token,
  });
  return { data, isError, error, isPending };
}
