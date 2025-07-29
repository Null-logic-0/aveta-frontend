import { Visibility } from "../enums/visibility.enum";

export interface CharacterInterface {
  id: number;
  characterName: string;
  avatar: string;
  tagline: string;
  description: string;
  greeting: string;
  tags: string[];
  visibility: Visibility;
  creator: {
    id: number;
    userName: string;
    profileImage: string;
  };
  likes: number;
}

export interface CharacterFormInterface {
  characterName: string;
  avatar?: string | File | null;
  tagline: string;
  description: string;
  greeting: string;
  tags: string | string[];
  visibility: Visibility;
}

export interface SubmitCharacterOptions {
  token: string;
  data: CharacterFormInterface;
  method: "POST" | "PATCH";
  characterId?: number;
}
