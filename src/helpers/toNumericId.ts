export function toNumericId(id?: string): number | undefined {
  return id ? parseInt(id, 10) : undefined;
}
