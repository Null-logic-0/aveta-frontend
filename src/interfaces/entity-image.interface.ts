import { EntityImageType } from "../enums/entity-images.enum";

export interface EntityImageInterface {
  id: number;
  image: string;
  type: EntityImageType;
}
