import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import { getUserLikedCharacters } from "../util/http";

export function useLikedCharacters({
  id,
  limit,
  page,
}: {
  id?: number;
  limit?: number;
  page?: number;
}) {
  const { token } = useAuth();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["liked-characters", id, limit, page],
    queryFn: () => {
      if (!token) throw new Error("Invalid credentials");
      return getUserLikedCharacters(token, id, limit, page);
    },
    retry: false,
    enabled: !!token && typeof page !== "undefined",
  });

  return { data, isError, error, isLoading };
}
