import { ObjectId } from 'bson';
import { ToppingDocument } from 'src/entities/topping';
import { Pizza } from 'src/application/providers/pizzas/pizza.provider.types';
import { PizzaDocument } from '../../src/entities/pizza';

const createMockPizza = (data?: Partial<Pizza>): Pizza => {
  return {
    id: new ObjectId().toHexString(),
    description: 'Test Pizza Description',
    imgSrc:
      'https://images.pexels.com/photos/905847/pexels-photo-905847.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    name: 'Test Pizza',
    toppingIds: [],

    ...data,
  };
};

const createMockPizzaDocument = (data?: Partial<PizzaDocument>): PizzaDocument => {
  return {
    _id: new ObjectId(),
    description: 'Test Pizza Description',
    imgSrc:
      'https://images.pexels.com/photos/905847/pexels-photo-905847.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    name: 'Test Pizza',
    priceCents: 0,
    toppingIds: [],

    ...data,
  };
};

const createMockToppingDocument = (data?: Partial<ToppingDocument>): ToppingDocument => {
  return {
    _id: new ObjectId('564f0184537878b57efcb703'),
    name: 'Tomato Sauce',
    priceCents: 250,
    ...data,
  };
};

export { createMockPizza, createMockPizzaDocument, createMockToppingDocument };
