import { Visibility } from "../enums/visibility.enum";

export const visibilityOptions = Object.values(Visibility).map((value) => ({
  value,
  label: value,
}));
