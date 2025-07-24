import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { GoogleLoginResponse } from "../interfaces/auth-api.interface";
import { useMutation } from "@tanstack/react-query";
import { googleSignIn } from "../util/http";
import { setAuth } from "../store/auth-slice";
import toast from "react-hot-toast";
import { queryClient } from "../constants/query-client.constants";

export function useGoogleAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return useMutation<GoogleLoginResponse, unknown, { credential: string }>({
    mutationFn: googleSignIn,
    onSuccess: async (data) => {
      dispatch(
        setAuth({
          accessToken: data.data.accessToken,
          refreshToken: data.data.refreshToken,
        })
      );
      toast.success("Logged in successfully!");
      await queryClient.invalidateQueries({ queryKey: ["me"] });
      navigate("/");
    },
    onError: (error: unknown) => {
      let message = "Login failed.";
      if (error instanceof Error) {
        message = error.message;
      }
      toast.error(message);
    },
  });
}
