import { useMutation } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import { toggleLikeCharacter } from "../util/http";
import { queryClient } from "../constants/query-client.constants";
import { CharacterInterface } from "../interfaces/character.interface";
import toast from "react-hot-toast";

export function useToggleLikeCharacter({ id }: { id: number }) {
  const { token } = useAuth();

  const { mutate } = useMutation({
    mutationFn: () => {
      if (!token) throw new Error("Invalid credentials!");
      return toggleLikeCharacter(token, id);
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["character", id] });

      const previousCharacter = queryClient.getQueryData<CharacterInterface>([
        "character",
        id,
      ]);

      queryClient.setQueryData(["character", id], (old: CharacterInterface) => {
        if (!old) return old;
        return {
          ...old,
          liked: !old.likes,
          likes: old.likes + (old.likes ? -1 : 1),
        };
      });

      return { previousCharacter };
    },
    onError: (error, _, context) => {
      toast.error(error.message || "Failed to update like status!");
      if (context?.previousCharacter) {
        queryClient.setQueryData(["character", id], context.previousCharacter);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["liked-character", id] });
    },
  });

  return { mutate };
}
