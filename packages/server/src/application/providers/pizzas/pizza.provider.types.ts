import { Topping } from 'src/application/schema/types/schema';

export interface Pizza {
  id: string;
  name: string;
  description: string;
  imgSrc: string;
  toppingIds: Array<string>;
}
