import { useMutation } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import { deleteCharacter } from "../util/http";
import toast from "react-hot-toast";
import { queryClient } from "../constants/query-client.constants";
import { useNavigate } from "react-router";

export function useDeleteCharacter({ characterId }: { characterId: number }) {
  const { token, data } = useAuth();
  const user = data?.data?.data;
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      if (!token) throw new Error("Invalid credentials");
      return await deleteCharacter(token, characterId);
    },
    onSuccess: async () => {
      toast.success("Character deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["characters"] });
      queryClient.invalidateQueries({ queryKey: ["liked-characters"] });
      queryClient.invalidateQueries({ queryKey: ["user-characters"] });
      await navigate(`/profile/${user?.id}`);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete character!");
    },
  });

  return { isPending, mutate };
}
