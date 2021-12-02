import { Pizza } from '../schema/types/schema';
import { pizzaProvider } from '../providers/';

interface newPizza extends Pizza {
  toppingIds: Array<string>;
}

type toppingOmit = Omit<newPizza, 'toppings'>;
type priceCentOmit = Omit<toppingOmit, 'priceCents'>;

const pizzaResolver = {
  Query: {
    pizzas: async (): Promise<priceCentOmit[]> => {
      return pizzaProvider.getPizza();
    },
  },
};

export { pizzaResolver };
