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
