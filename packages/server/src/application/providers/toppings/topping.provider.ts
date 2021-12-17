import { ObjectId, Collection } from 'mongodb';
import { ToppingDocument, toToppingObject } from '../../../entities/topping';
import { CreateToppingInput, Topping, UpdateToppingInput } from './topping.provider.types';
import validateStringInputs from '../../../lib/string-validator';

class ToppingProvider {
  constructor(private collection: Collection<ToppingDocument>) {}

  public async validateToppings(input: Array<ObjectId>): Promise<void> {
    const toppingIds = input.map((s) => new ObjectId(s));
    const mytoppings = (await this.getToppings()).map((records) => records.id);

    let objectIdArray = toppingIds.map((x) => x.toString());

    const inputCount = input.length;
    const validCount = await this.collection.countDocuments({ _id: { $in: toppingIds } });
    const result = objectIdArray.every((element) => mytoppings.includes(element));

    if (!result) {
      throw new Error(`Topping ${toppingIds} can not be found`);
    }
  }

  public async getPriceCents(toppingIds: Array<ObjectId>): Promise<number> {
    const records = await this.collection
      .find({ _id: { $in: toppingIds } })
      .sort({ name: 1 })
      .toArray();
    const priceList = records.map((records) => records.priceCents);
    let total = priceList.reduce((previousValue, currentValue) => previousValue + currentValue, 0);

    return total;
  }

  public async getToppingsByIds(toppingIds: Array<ObjectId>): Promise<Topping[]> {
    const records = await this.collection
      .find({ _id: { $in: toppingIds } })
      .sort({ name: 1 })
      .toArray();

    return records.map(toToppingObject);
  }

  public async getToppings(): Promise<Topping[]> {
    const toppings = await this.collection.find().sort({ name: 1 }).toArray();
    return toppings.map(toToppingObject);
  }

  public async createTopping(input: CreateToppingInput): Promise<Topping> {
    const data = await this.collection.findOneAndUpdate(
      { _id: new ObjectId() },
      { $set: { ...input, updatedAt: new Date().toISOString(), createdAt: new Date().toISOString() } },
      { upsert: true, returnDocument: 'after' }
    );

    if (!data.value) {
      throw new Error(`Could not create the ${input.name} topping`);
    }
    const topping = data.value;

    return toToppingObject(topping);
  }

  public async deleteTopping(id: string): Promise<string> {
    const toppingId = new ObjectId(id);

    const toppingData = await this.collection.findOneAndDelete({
      _id: toppingId,
    });

    const topping = toppingData.value;

    if (!topping) {
      throw new Error(`Could not delete the topping`);
    }

    return id;
  }

  public async updateTopping(input: UpdateToppingInput): Promise<Topping> {
    const { id, name, priceCents } = input;

    if (name) validateStringInputs(name);

    const data = await this.collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { ...(name && { name: name }), ...(priceCents && { priceCents: priceCents }) } },
      { returnDocument: 'after' }
    );

    if (!data.value) {
      throw new Error(`Could not update the topping`);
    }
    const topping = data.value;

    return toToppingObject(topping);
  }
}

export { ToppingProvider };
