import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router/dom";
import { Toaster } from "react-hot-toast";
import { queryClient } from "./constants/query-client.constants";
import { router } from "./components/routes/router";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
