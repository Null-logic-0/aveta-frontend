import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router/dom";
import { Toaster } from "react-hot-toast";
import { queryClient } from "./constants/query-client.constants";
import { router } from "./components/routes/router";
import { useEffect } from "react";
import { RootState } from "./store";
import { useSelector } from "react-redux";
import { handleTokenExpiry } from "./util/token-expiry-handler";

function App() {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const refreshToken = useSelector(
    (state: RootState) => state.auth.refreshToken
  );

  useEffect(() => {
    if (accessToken && refreshToken) {
      handleTokenExpiry(accessToken, refreshToken);
    }
  }, [accessToken, refreshToken]);
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#8A38F5",
            color: "#fff",
            fontWeight: "bold",
            fontSize: "14px",
          },
        }}
      />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
