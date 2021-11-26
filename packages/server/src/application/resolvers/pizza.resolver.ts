import { Pizza } from '../schema/types/schema';
import { pizzaProvider } from '../providers/';

interface newPizza extends Pizza {
  toppingIds: Array<string>;
}

type toppingOmit = Omit<newPizza, 'toppings'>;

const pizzaResolver = {
  Query: {
    pizzas: async (): Promise<toppingOmit[]> => {
      return pizzaProvider.getPizza();
    },
  },
};

export { pizzaResolver };
