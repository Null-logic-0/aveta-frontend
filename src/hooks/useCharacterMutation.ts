import { useState } from "react";
import { AxiosError } from "axios";
import { useAuth } from "./useAuth";
import { useNavigate } from "react-router";
import { createCharacter, updateCharacter } from "../util/http";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../constants/query-client.constants";
import { CharacterFormInterface } from "../interfaces/character.interface";
import { CharacterFormErrors } from "../interfaces/error-response.interface";

import toast from "react-hot-toast";
import { clearSelectedImage } from "../store/UI-slice";
import { useDispatch } from "react-redux";

type ErrorField = keyof CharacterFormErrors;

function isErrorField(field: string): field is ErrorField {
  return [
    "avatar",
    "characterName",
    "tagline",
    "description",
    "greeting",
    "visibility",
    "tags",
  ].includes(field);
}

type UseCharacterMutationOptions = {
  mode: "create" | "update";
  characterId?: number;
};

export function useCharacterMutation({
  mode,
  characterId,
}: UseCharacterMutationOptions) {
  const { token, data } = useAuth();
  const user = data?.data.data;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formErrors, setFormErrors] = useState<CharacterFormErrors>({
    avatar: "",
    characterName: "",
    tagline: "",
    description: "",
    greeting: "",
    visibility: "",
    tags: "",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: CharacterFormInterface) => {
      if (!token) throw new Error("Invalid credentials!");
      return mode === "create"
        ? createCharacter(token, data)
        : updateCharacter(token, characterId!, data);
    },
    onSuccess: async () => {
      toast.success("Character created successfully!");
      queryClient.invalidateQueries({ queryKey: ["characters"] });
      queryClient.invalidateQueries({ queryKey: ["liked-characters"] });
      queryClient.invalidateQueries({ queryKey: ["user-characters"] });
      queryClient.invalidateQueries({ queryKey: ["chats"] });
      queryClient.invalidateQueries({ queryKey: ["chat"] });
      dispatch(clearSelectedImage());
      await navigate(`/profile/${user?.id}`);
    },
    onError: (error: AxiosError<{ message: string[] }>) => {
      const messages = error.response?.data?.message;

      if (Array.isArray(messages)) {
        const newErrors: CharacterFormErrors = {
          avatar: "",
          characterName: "",
          tagline: "",
          description: "",
          greeting: "",
          visibility: "",
          tags: "",
        };
        messages.forEach((msg) => {
          const field = msg.split(" ")[0];
          if (isErrorField(field)) {
            newErrors[field] = newErrors[field]
              ? newErrors[field] + "\n" + msg
              : msg;
          }
        });

        setFormErrors(newErrors);
      }
      toast.error(error.message || "Failed to create character");
    },
  });

  return { mutate, isPending, formErrors };
}
