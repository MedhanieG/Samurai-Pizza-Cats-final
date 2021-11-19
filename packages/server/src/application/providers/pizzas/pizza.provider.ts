import { ObjectId, Collection } from 'mongodb';
import { PizzaDocument, toPizzaObject } from '../../../entities/pizza';
import { Pizza } from './pizza.provider.types';
import validateStringInputs from '../../../lib/string-validator';

class PizzaProvider {
  constructor(private collection: Collection<PizzaDocument>) {}

  public async getPizza(): Promise<Pizza[]> {
    const pizza = await this.collection.find().sort({ name: 1 }).toArray();
    return pizza.map(toPizzaObject);
  }

  //   public async createPizza(input: CreatePizzaInput): Promise<Pizza> {
  //     const data = await this.collection.findOneAndUpdate(
  //       { _id: new ObjectId() },
  //       { $set: { ...input, updatedAt: new Date().toISOString(), createdAt: new Date().toISOString() } },
  //       { upsert: true, returnDocument: 'after' }
  //     );

  //     if (!data.value) {
  //       throw new Error(`Could not create the ${input.name} pizza`);
  //     }
  //     const pizza = data.value;

  //     return toPizzaObject(pizza);
  //   }

  //   public async deletePizza(id: string): Promise<string> {
  //     const pizzaId = new ObjectId(id);

  //     const pizzaData = await this.collection.findOneAndDelete({
  //       _id: pizzaId,
  //     });

  //     const pizza = pizzaData.value;

  //     if (!pizza) {
  //       throw new Error(`Could not delete the topping`);
  //     }

  //     return id;
  //   }

  //   public async updatePizza(input: UpdatePizzaInput): Promise<Pizza> {
  //     const { id, name, priceCents } = input;

  //     if (name) validateStringInputs(name);

  //     const data = await this.collection.findOneAndUpdate(
  //       { _id: new ObjectId(id) },
  //       { $set: { ...(name && { name: name }), ...(priceCents && { priceCents: priceCents }) } },
  //       { returnDocument: 'after' }
  //     );

  //     if (!data.value) {
  //       throw new Error(`Could not update the topping`);
  //     }
  //     const topping = data.value;

  //     return toToppingObject(topping);
  //   }
}

export { PizzaProvider };
