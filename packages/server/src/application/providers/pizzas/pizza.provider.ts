import { ObjectId, Collection } from 'mongodb';
import validateStringInputs from '../../../lib/string-validator';
import { PizzaDocument, toPizzaObject } from '../../../entities/pizza';
import { Pizza, CreatePizzaInput, UpdatePizzaInput } from './pizza.provider.types';

class PizzaProvider {
  constructor(private collection: Collection<PizzaDocument>) {}

  public async getPizza(): Promise<Pizza[]> {
    const pizza = await this.collection.find().sort({ name: 1 }).toArray();
    return pizza.map(toPizzaObject);
  }

  public async createPizza(input: CreatePizzaInput): Promise<Pizza> {
    const { description, name, imgSrc, toppingIds } = input;
    if ([description, name, imgSrc]) validateStringInputs([description, name, imgSrc]);

    const data = await this.collection.findOneAndUpdate(
      { _id: new ObjectId() },
      {
        $set: {
          name: name,
          description: description,
          imgSrc: imgSrc,
          toppingIds: toppingIds.map((s) => new ObjectId(s)),
          updatedAt: new Date().toISOString(),
          createdAt: new Date().toISOString(),
        },
      },
      { upsert: true, returnDocument: 'after' }
    );

    if (!data.value) {
      throw new Error(`Could not create the ${input.name} pizza`);
    }
    const pizza = data.value;

    return toPizzaObject(pizza);
  }

  public async updatePizza(input: UpdatePizzaInput): Promise<Pizza> {
    const { id, name, description, imgSrc, toppingIds } = input;

    if (name) validateStringInputs(name);

    let toppingObjectIds = toppingIds;
    if (toppingIds != null) {
      toppingObjectIds = toppingIds.map((s) => new ObjectId(s));
    }

    const data = await this.collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...(name && { name: name }),
          ...(description && { description: description }),
          ...(imgSrc && { imgSrc: imgSrc }),
          ...(toppingObjectIds && { toppingIds: toppingObjectIds }),
        },
      },
      { returnDocument: 'after' }
    );

    if (!data.value) {
      throw new Error(`Could not update the pizza`);
    }
    const pizza = data.value;

    return toPizzaObject(pizza);
  }

  public async deletePizza(id: string): Promise<string> {
    const pizzaId = new ObjectId(id);

    const pizzaData = await this.collection.findOneAndDelete({
      _id: pizzaId,
    });

    const pizza = pizzaData.value;

    if (!pizza) {
      throw new Error(`Could not delete the pizza`);
    }

    return id;
  }
}

export { PizzaProvider };
