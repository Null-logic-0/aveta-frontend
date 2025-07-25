import { Tags } from "../enums/tags.enum";

export const characterTags = Object.entries(Tags).map(([, value], index) => ({
  id: (index + 1).toString(),
  title: value,
}));
