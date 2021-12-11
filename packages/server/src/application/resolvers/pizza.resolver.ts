import { Pizza } from '../schema/types/schema';
import { pizzaProvider, toppingProvider } from '../providers/';
import { ObjectId } from 'bson';
import { CreatePizzaInput, DeletePizzaInput, UpdatePizzaInput } from '../schema/types/schema';
import { Root } from '../schema/types/types';

interface newPizza extends Pizza {
  toppingIds: Array<ObjectId>;
}

type toppingOmit = Omit<newPizza, 'toppings'>;
type priceCentOmit = Omit<toppingOmit, 'priceCents'>;

const pizzaResolver = {
  Query: {
    pizzas: async (): Promise<priceCentOmit[]> => {
      return pizzaProvider.getPizza();
    },
  },

  Mutation: {
    createPizza: async (_: Root, args: { input: CreatePizzaInput }): Promise<priceCentOmit> => {
      return pizzaProvider.createPizza(args.input);
    },

    updatePizza: async (_: Root, args: { input: UpdatePizzaInput }): Promise<priceCentOmit> => {
      return pizzaProvider.updatePizza(args.input);
    },

    deletePizza: async (_: Root, args: { input: DeletePizzaInput }): Promise<string> => {
      return pizzaProvider.deletePizza(args.input.id);
    },
  },
};

export { pizzaResolver };
