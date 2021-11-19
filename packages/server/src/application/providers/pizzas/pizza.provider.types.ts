import { ObjectId } from 'bson';

export interface Pizza {
  id: string;
  name: string;
  description: string;
  imgSrc: string;
  toppingIds: Array<string>;
}

//   export interface CreateToppingInput {
//     name: string;
//     priceCents: number;
//   }

//   export interface UpdateToppingInput {
//     id: string;
//     name?: string | null;
//     priceCents?: number | null;
//   }
