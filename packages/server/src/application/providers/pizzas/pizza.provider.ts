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
}

export { PizzaProvider };
