import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import { getSingleUser } from "../util/http";

export function useFetchUser({ id }: { id: number }) {
  const { token } = useAuth();

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["user", id],
    queryFn: () => {
      if (!token) throw new Error("Invalid token!");
      return getSingleUser(token, id);
    },
    retry: false,
    enabled: !!id || !!token,
  });

  return { data, isLoading, error, isError };
}
