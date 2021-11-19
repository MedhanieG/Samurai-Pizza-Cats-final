import { Pizza } from '../schema/types/schema';
import { Root } from '../schema/types/types';
import { pizzaProvider } from '../providers/';

const pizzaResolver = {
  Query: {
    pizzas: async (): Promise<Pizza[]> => {
      return pizzaProvider.getPizza();
    },
  },
};

export { pizzaResolver };
