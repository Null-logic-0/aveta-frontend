import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import { getLikedCharacterByUser } from "../util/http";

export function useFetchLikedCharacterByUser({ id }: { id: number }) {
  const { token } = useAuth();

  const { data } = useQuery({
    queryKey: ["liked-character", id],
    queryFn: () => {
      if (!token) throw new Error("Invalid credentials!");
      if (!id) return null;
      return getLikedCharacterByUser(token, id);
    },
    retry: false,
    enabled: !!id || !!token,
  });
  return { data };
}
