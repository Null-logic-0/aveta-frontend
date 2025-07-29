export interface ErrorResponse {
  message: string[] | string;
  error: string;
  statusCode: number;
  errors?: Record<string, string> | { field: string; message: string }[];
}

export interface CharacterFormErrors {
  avatar: string;
  characterName: string;
  tagline: string;
  greeting: string;
  description: string;
  tags: string;
  visibility: string;
}

export interface CharacterValidationErrorResponse {
  response?: {
    message?: string[];
    error?: string;
    statusCode?: number;
  };
  message?: string;
}
