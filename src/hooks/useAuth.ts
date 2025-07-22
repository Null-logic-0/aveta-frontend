import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useQuery } from "@tanstack/react-query";
import { GetMeResponse } from "../interfaces/current-user-response.interface";
import { getMe } from "../util/http";

export function useAuth() {
  const token = useSelector((state: RootState) => state.auth.accessToken);

  const { isPending, isError, data, error } = useQuery<GetMeResponse>({
    queryKey: ["me"],
    queryFn: () => {
      if (!token) throw new Error("No token provided");
      return getMe(token);
    },
    enabled: !!token,
    retry: false,
  });

  return {
    isError,
    error,
    isPending,
    data,
    token,
  };
}
