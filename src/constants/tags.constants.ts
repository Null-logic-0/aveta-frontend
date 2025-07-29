import { Tags } from "../enums/tags.enum";

export const characterTags = Object.entries(Tags).map(([, value], index) => ({
  id: (index + 1).toString(),
  title: value,
}));

export const optionTags = Object.values(Tags).map((value) => ({
  label: value,
  value: value,
}));
