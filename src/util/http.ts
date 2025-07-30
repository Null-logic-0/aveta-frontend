import axios, { isAxiosError } from "axios";

import { URL } from "../constants/url.constants";
import { buildApiError, buildValidationError } from "./api-error";
import { AuthParams } from "../interfaces/auth-params.interface";
import {
  AuthResponse,
  ChangePassword,
  ForgotPassword,
  GoogleLoginResponse,
  SignInRequest,
  SingUpRequest,
  UpdatePasswordInterface,
} from "../interfaces/auth-api.interface";
import { GetMeResponse } from "../interfaces/current-user-response.interface";
import { assertTokenExists } from "./assert-token";
import { EntityImageType } from "../enums/entity-images.enum";
import {
  CharacterFormInterface,
  SubmitCharacterOptions,
} from "../interfaces/character.interface";
import { ErrorResponse } from "../interfaces/error-response.interface";
import { UpdateUserProfileInterface } from "../interfaces/user-profile.interface";

// Authentication
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

export async function googleSignIn({
  credential,
}: {
  credential: string;
}): Promise<GoogleLoginResponse> {
  try {
    const result = await axios.post(
      `${URL}/google-auth`,
      { token: credential },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return result.data;
  } catch (err) {
    throw buildApiError("Google sign in failed!", 500, err);
  }
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

export async function updatePassword(
  token: string,
  data: UpdatePasswordInterface
) {
  assertTokenExists(token);
  try {
    const response = await axios.patch(`${URL}/auth/update-password`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    return response.data;
  } catch (err: unknown) {
    if (isAxiosError(err)) {
      if (err.response?.status === 400) {
        throw buildValidationError("Validation failed", 400, err.response.data);
      }
      throw buildApiError(
        `Failed to update password`,
        500,
        err.response?.data || err
      );
    }
    throw err;
  }
}

// Users

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

export async function getSingleUser(token: string, id: number) {
  assertTokenExists(token);
  try {
    const response = await axios.get(`${URL}/users/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    throw buildApiError("Failed to get user profile!", 500, err);
  }
}

export async function getUserCreatedCharacters(
  token: string,
  id?: number,
  limit?: number,
  page?: number
) {
  assertTokenExists(token);

  try {
    const response = await axios.get(`${URL}/users/me/my-characters`, {
      params: {
        limit,
        page,
        targetUserId: id,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    throw buildApiError("Failed to get created characters by user!", 500, err);
  }
}

export async function getUserLikedCharacters(
  token: string,
  id?: number,
  limit?: number,
  page?: number
) {
  assertTokenExists(token);
  try {
    const response = await axios.get(`${URL}/users/me/liked-characters`, {
      params: {
        limit,
        page,
        targetUserId: id,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    throw buildApiError("Failed to get liked characters by user!", 500, err);
  }
}

// Account
export async function updateProfile(
  token: string,
  data: UpdateUserProfileInterface
) {
  assertTokenExists(token);
  const formData = new FormData();
  formData.append("userName", data.userName);
  formData.append("profileImage", data.profileImage);

  try {
    const response = await axios.patch(
      `${URL}/users/me/update-profile`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (err) {
    throw buildApiError("Failed to update user profile", 500, err);
  }
}

export async function deleteAccount(token: string) {
  assertTokenExists(token);
  try {
    return await axios.delete(`${URL}/users/me/delete-account`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
  } catch (err) {
    throw buildApiError("Failed to delete account", 500, err);
  }
}

// Characters

export async function submitCharacterForm({
  token,
  data,
  method,
  characterId,
}: SubmitCharacterOptions) {
  assertTokenExists(token);

  const formData = new FormData();
  formData.append("characterName", data.characterName);
  formData.append("tagline", data.tagline);
  formData.append("description", data.description);
  formData.append("visibility", data.visibility);

  if (Array.isArray(data.tags)) {
    data.tags.forEach((tag) => formData.append("tags", tag.trim()));
  } else if (typeof data.tags === "string") {
    formData.append("tags", data.tags.trim());
  }

  if (data.greeting) {
    formData.append("greeting", data.greeting);
  }

  if (data.avatar instanceof File) {
    formData.append("avatar", data.avatar);
  } else if (typeof data.avatar === "string") {
    formData.append("avatar", data.avatar);
  }

  const url =
    method === "PATCH"
      ? `${URL}/characters/${characterId}`
      : `${URL}/characters`;

  try {
    const response = await axios({
      method,
      url,
      data: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    return response.data;
  } catch (err: unknown) {
    if (isAxiosError(err)) {
      if (err.response?.status === 400) {
        throw buildValidationError("Validation failed", 400, err.response.data);
      }
      throw buildApiError(
        `Failed to ${method === "PATCH" ? "update" : "create"} character!`,
        500,
        err.response?.data || err
      );
    }
    throw err;
  }
}

export function createCharacter(token: string, data: CharacterFormInterface) {
  return submitCharacterForm({ token, data, method: "POST" });
}

export function updateCharacter(
  token: string,
  characterId: number,
  data: CharacterFormInterface
) {
  return submitCharacterForm({ token, data, method: "PATCH", characterId });
}

export async function deleteCharacter(token: string, id: number) {
  assertTokenExists(token);
  try {
    return await axios.delete(`${URL}/characters/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
  } catch (err) {
    throw buildApiError("Failed to delete character!", 500, err);
  }
}

export async function getAllCharacters(
  token: string,
  queryParams?: Record<string, string | number | boolean | undefined>
) {
  assertTokenExists(token);
  try {
    const query = new URLSearchParams();

    if (queryParams) {
      Object.entries(queryParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          query.append(key, value.toString().toLowerCase());
        }
      });
    }
    const response = await axios.get(`${URL}/characters?${query.toString()}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    throw buildApiError("Failed to fetch all characters!", 500, err);
  }
}

export async function getOneCharacter(token: string, id: number) {
  assertTokenExists(token);
  try {
    const response = await axios.get(`${URL}/characters/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    return response;
  } catch (err) {
    throw buildApiError("Failed to fetch single character!", 500, err);
  }
}

// Avatars&Themes

export async function getAllEntityImages(token: string, type: EntityImageType) {
  assertTokenExists(token);
  try {
    const response = await axios.get(`${URL}/entity-images`, {
      params: {
        type,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    throw buildApiError("Failed to fetch avatars!", 500, err);
  }
}
