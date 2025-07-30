import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import { EntityImageType } from "../enums/entity-images.enum";
import { getAllEntityImages } from "../util/http";

export function useFetchEntityImages({ type }: { type: EntityImageType }) {
  const { token } = useAuth();

  const { data, isError, error, isPending } = useQuery({
    queryKey: ["entity-images", type],
    queryFn: () => {
      if (!token) throw new Error("Invalid credentials!");
      return getAllEntityImages(token, type);
    },
    retry: false,
    enabled: !!type || !!token,
  });
  return { data, isError, error, isPending };
}
