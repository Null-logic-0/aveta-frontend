export function getCookie(name: string): string | null {
  const cookieArr = document.cookie.split(";");

  for (let cookie of cookieArr) {
    const [key, value] = cookie.trim().split("=");
    if (key === name && value !== undefined) {
      return decodeURIComponent(value);
    }
  }

  return null;
}
