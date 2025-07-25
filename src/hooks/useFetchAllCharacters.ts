import { useQuery } from "@tanstack/react-query";
import { getAllCharacters } from "../util/http";
import { useAuth } from "./useAuth";

export function useFetchAllCharacters(
  filters?: Record<string, string | number | boolean | undefined>
) {
  const { token } = useAuth();
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["characters", filters],
    queryFn: () => {
      if (!token) throw new Error("Invalid credentials!");
      return getAllCharacters(token, filters);
    },
    retry: false,
    enabled: !!token,
  });

  return { data, isError, error, isLoading };
}
