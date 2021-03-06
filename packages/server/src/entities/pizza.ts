import { Document } from 'mongodb';
import { Pizza } from '../application/providers/pizzas/pizza.provider.types';

interface PizzaDocument extends Document, Omit<Pizza, 'id'> {}

const toPizzaObject = (pizza: PizzaDocument): Pizza => {
  return {
    id: pizza._id.toHexString(),
    name: pizza.name,
    description: pizza.description,
    imgSrc: pizza.imgSrc,
    toppingIds: pizza.toppingIds,
  };
};

export { PizzaDocument, toPizzaObject };
