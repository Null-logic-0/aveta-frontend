import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import { getOneCharacter } from "../util/http";

export function useFetchCharacter({ id }: { id: number }) {
  const { token } = useAuth();

  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["character", id],
    queryFn: () => {
      if (!id) throw new Error("Character not found!");
      if (!token) throw new Error("Invalid credentials!");
      getOneCharacter(token, id);
    },
    retry: false,
    enabled: !!id || !!token,
  });
  return { data, isError, isLoading, error };
}
