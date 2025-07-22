export interface AuthResponse {
  data: {
    tokens: {
      accessToken: string;
      refreshToken: string;
    };
    user?: {
      id: number;
      userName: string;
      email: string;
      profileImage?: string;
      role: string;
      userPlan: string;
      isPaid: boolean;
      googleId?: string;
      createdAt: string;
      updatedAt: string;
    };
  };
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface SingUpRequest {
  userName: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface GoogleLoginResponse {
  data: {
    refreshToken: string;
    accessToken: string;

    user?: {
      id: number;
      userName: string;
      email: string;
      profileImage?: string;
      role: string;
      userPlan: string;
      isPaid: boolean;
      googleId?: string;
      createdAt: string;
      updatedAt: string;
    };
  };
}

export interface ErrorResponse {
  message: string[] | string;
  error: string;
  statusCode: number;
  errors?: Record<string, string> | { field: string; message: string }[];
}

export interface ForgotPassword {
  email: string;
}

export interface ChangePassword {
  newPassword: string;
  confirmPassword: string;
}
