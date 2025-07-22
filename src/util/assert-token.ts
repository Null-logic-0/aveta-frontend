export function assertTokenExists(token?: string) {
  if (!token) {
    throw new Error("No token found! Please sign in.");
  }
}
