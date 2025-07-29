export function buildApiError(
  message: string,
  status: number,
  info?: unknown
): Error & { code?: number; info?: unknown } {
  const error = new Error(message) as Error & {
    code?: number;
    info?: unknown;
  };

  error.code = status;
  error.info = info;

  return error;
}

export function buildValidationError(
  message: string,
  code: number,
  responseData: unknown
) {
  const error = new Error(message);
  (error as any).response = { data: responseData };
  (error as any).code = code;
  return error;
}
