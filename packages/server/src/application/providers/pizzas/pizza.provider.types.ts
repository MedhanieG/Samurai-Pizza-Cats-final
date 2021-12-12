import { ObjectID } from 'bson';

export interface Pizza {
  id: string;
  name: string;
  description: string;
  imgSrc: string;
  toppingIds: Array<ObjectID>;
}

export interface CreatePizzaInput {
  name: string;
  description: string;
  toppingIds: Array<ObjectID>;
  imgSrc: string;
}

export interface UpdatePizzaInput {
  id: string;
  name?: string | null;
  description?: string | null;
  toppingIds?: Array<ObjectID> | null;
  imgSrc?: string | null;
}
