import store from "../store";
import { clearAuth, setAuth } from "../store/auth-slice";
import { jwtDecode } from "jwt-decode";

let refreshTimer: ReturnType<typeof setTimeout> | null = null;

interface JWTPayload {
  exp: number;
}

export function handleTokenExpiry(accessToken: string) {
  try {
    const decoded = jwtDecode<JWTPayload>(accessToken);
    const expiryTimeMs = decoded.exp * 1000 - Date.now();
    const refreshInMs = expiryTimeMs - 30_000;

    if (refreshTimer) clearTimeout(refreshTimer);

    if (refreshInMs > 0) {
      refreshTimer = setTimeout(async () => {
        const state = store.getState();
        const refreshToken = state.auth.refreshToken;

        if (!refreshToken) {
          store.dispatch(clearAuth());
          return;
        }

        try {
          const res = await fetch(`${URL}/auth/refresh-tokens`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refreshToken }),
          });

          if (!res.ok) throw new Error("Token refresh failed");

          const data = await res.json();
          store.dispatch(setAuth(data));

          handleTokenExpiry(data.accessToken);
        } catch (err) {
          console.error("Refresh failed:", err);
          store.dispatch(clearAuth());
        }
      }, refreshInMs);
    } else {
      store.dispatch(clearAuth());
    }
  } catch (err) {
    console.error("Invalid token:", err);
    store.dispatch(clearAuth());
  }
}
