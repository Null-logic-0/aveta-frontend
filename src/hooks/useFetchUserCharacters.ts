import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import { getUserCreatedCharacters } from "../util/http";

export function useFetchUserCharacters({
  id,
  limit,
  page,
}: {
  id?: number;
  limit?: number;
  page?: number;
}) {
  const { token } = useAuth();
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["user-characters", id, limit, page],
    queryFn: () => {
      if (!token) throw new Error("Invalid credentials");
      return getUserCreatedCharacters(token, id, limit, page);
    },
    retry: false,
    enabled: !!token && typeof page !== "undefined",
  });
  return { data, isError, error, isLoading };
}
