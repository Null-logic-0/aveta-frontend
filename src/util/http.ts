import axios from "axios";

import { URL } from "../constants/url.constants";
import { buildApiError } from "./api-error";
import { AuthParams } from "../interfaces/auth-params.interface";
import {
  AuthResponse,
  ChangePassword,
  ErrorResponse,
  ForgotPassword,
  SignInRequest,
  SingUpRequest,
} from "../interfaces/auth-api.interface";
import { GetMeResponse } from "../interfaces/current-user-response.interface";
import { assertTokenExists } from "./assert-token";

async function auth<Req, Res>(params: AuthParams<Req>): Promise<Res> {
  const { data, path, message } = params;

  try {
    const response = await axios.post<Res>(`${URL}/auth/${path}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    return response.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err) && err.response) {
      const { status, data } = err.response;

      return Promise.reject(
        buildApiError(message, status, data as ErrorResponse)
      );
    }

    return Promise.reject(buildApiError("Unexpected error occurred", 500, err));
  }
}

export async function signup(data: SingUpRequest): Promise<AuthResponse> {
  return await auth<SingUpRequest, AuthResponse>({
    data,
    path: "sign-up",
    message: "Sign-up failed!",
  });
}

export async function signin(data: SignInRequest): Promise<AuthResponse> {
  return await auth<SignInRequest, AuthResponse>({
    data,
    path: "sign-in",
    message: "Sign-in failed!",
  });
}

export async function signout(token: string) {
  assertTokenExists(token);
  try {
    const response = await axios.post(
      `${URL}/auth/sign-out`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );
    return response;
  } catch (err) {
    throw buildApiError("Sign-out failed!", 500, err);
  }
}

export async function forgotPassword(data: ForgotPassword) {
  try {
    const response = await axios.post(`${URL}/auth/forgot-password`, data, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response;
  } catch (err) {
    throw buildApiError("Failed to send email!", 500, err);
  }
}

export async function changePassword(data: ChangePassword, token: string) {
  assertTokenExists(token);
  try {
    const response = await axios.post(`${URL}/auth/reset-password`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (err) {
    throw buildApiError("Failed to change password!", 500, err);
  }
}

export async function getMe(token: string): Promise<GetMeResponse> {
  assertTokenExists(token);
  try {
    const response = await axios.get(`${URL}/users/me/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    return response;
  } catch (err) {
    throw buildApiError("Failed to get user profile!", 500, err);
  }
}
