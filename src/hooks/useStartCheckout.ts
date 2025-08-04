import { useMutation } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import { startCheckout } from "../util/http";
import { UserPlan } from "../enums/user-plan.enum";
import toast from "react-hot-toast";

export function useStartCheckout() {
  const { token } = useAuth();

  const { mutate, isPending } = useMutation({
    mutationFn: async (payload: { plan: UserPlan }) => {
      console.log("mutationFn called with plan:", payload);

      if (!token) throw new Error("Invalid credentials!");
      const data = await startCheckout(token, payload);
      if (!data?.data.url) {
        toast.error("No checkout URL received");
        return;
      }
      console.log("Redirecting to:", data?.data.url);

      window.location.href = data?.data.url;
    },
    onError: (error) => {
      toast.error(error.message || "Failed to start checkout!");
    },
  });

  return { mutate, isPending };
}
