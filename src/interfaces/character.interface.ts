export interface CharacterInterface {
  id: number;
  characterName: string;
  avatar: string;
  tagline: string;
  description: string;
  greeting: string;
  tags: string[];
  visibility: "public" | "private";
  creator: {
    userName: string;
    profileImage: string;
  };
  likes: number;
}
