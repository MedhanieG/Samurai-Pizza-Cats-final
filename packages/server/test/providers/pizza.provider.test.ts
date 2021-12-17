import { Collection, ObjectId } from 'mongodb';

import { reveal, stub } from 'jest-auto-stub';
import { ToppingProvider } from '../../src/application/providers/toppings/topping.provider';
import { PizzaProvider } from '../../src/application/providers/pizzas/pizza.provider';
import { mockSortToArray } from '../helpers/mongo.helper';
import { createMockPizzaDocument } from '../helpers/pizza.helper';
import { PizzaDocument, toPizzaObject } from '../../src/entities/pizza';
import { ToppingDocument } from 'src/entities/topping';
import { createMockToppingDocument } from '../helpers/pizza.helper';

const stubPizzaCollection = stub<Collection<PizzaDocument>>();
const stubToppingCollection = stub<Collection<ToppingDocument>>();
const toppingProvider = new ToppingProvider(stubToppingCollection);
const pizzaProvider = new PizzaProvider(stubPizzaCollection, toppingProvider);

beforeEach(jest.clearAllMocks);

describe('pizzaProvider', (): void => {
  const mockPizzaDocument = createMockPizzaDocument();
  const mockPizza = toPizzaObject(mockPizzaDocument);
  const mockToppingDocument = createMockToppingDocument();

  describe('getPizzas', (): void => {
    beforeEach(() => {
      reveal(stubToppingCollection).find.mockImplementation(mockSortToArray([mockToppingDocument]));
      reveal(stubPizzaCollection).find.mockImplementation(mockSortToArray([mockPizzaDocument]));
    });

    test('should call find once', async () => {
      await pizzaProvider.getPizza();
      expect(stubPizzaCollection.find).toHaveBeenCalledTimes(1);
    });

    test('should get all pizzas', async () => {
      const result = await pizzaProvider.getPizza();
      expect(result).toEqual([mockPizza]);
    });
  });

  describe('createPizza', (): void => {
    const validPizza = createMockPizzaDocument({
      name: 'test pizza',
      description: 'tomato pizza test',
      toppingIds: [new ObjectId('564f0184537878b57efcb703')],
      imgSrc:
        'https://images.unsplash.com/photo-1559978137-8c560d91e9e1?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjd8fGNoZWVzZSUyMHBpenphfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    });

    beforeEach(() => {
      reveal(stubPizzaCollection).findOneAndUpdate.mockImplementation(() => ({ value: validPizza }));
      reveal(stubToppingCollection).find.mockImplementation(mockSortToArray([mockToppingDocument]));
    });

    test('should call findOneAndUpdate once', async () => {
      await pizzaProvider.createPizza({
        name: validPizza.name,
        description: validPizza.description,
        toppingIds: validPizza.toppingIds,
        imgSrc: validPizza.imgSrc,
      });

      expect(stubPizzaCollection.findOneAndUpdate).toHaveBeenCalledTimes(1);
    });

    test('should throw an error if pizza topping does not exist', async () => {
      await expect(
        pizzaProvider.createPizza({
          name: validPizza.name,
          description: validPizza.description,
          toppingIds: [new ObjectId('000f0000000000b00efcb000')],
          imgSrc: validPizza.imgSrc,
        })
      ).rejects.toThrow(new Error('Topping 000f0000000000b00efcb000 can not be found'));
    });

    test('should return a pizza when passed valid input', async () => {
      const result = await pizzaProvider.createPizza({
        name: validPizza.name,
        description: validPizza.description,
        toppingIds: validPizza.toppingIds,
        imgSrc: validPizza.imgSrc,
      });

      expect(result).toEqual(toPizzaObject(validPizza));
    });
  });

  describe('deletePizza', (): void => {
    beforeEach(() => {
      reveal(stubPizzaCollection).findOneAndDelete.mockImplementation(() => ({ value: mockPizzaDocument }));
    });
    test('should call findOneAndDelete once', async () => {
      await pizzaProvider.deletePizza(mockPizza.id);

      expect(stubPizzaCollection.findOneAndDelete).toHaveBeenCalledTimes(1);
    });

    test('should throw an error if findOneAndDelete returns null for value', async () => {
      reveal(stubPizzaCollection).findOneAndDelete.mockImplementation(() => ({ value: null }));

      await expect(pizzaProvider.deletePizza(mockPizza.id)).rejects.toThrow(new Error('Could not delete the pizza'));
    });

    test('should return an id', async () => {
      const result = await pizzaProvider.deletePizza(mockPizza.id);
      expect(result).toEqual(mockPizza.id);
    });
  });

  describe('updatePizza', (): void => {
    const validPizza = createMockPizzaDocument({ name: 'test pizzaaa' });
    beforeEach(() => {
      reveal(stubPizzaCollection).findOneAndUpdate.mockImplementation(() => ({ value: validPizza }));
    });

    test('should call findOneAndUpdate once', async () => {
      await pizzaProvider.updatePizza({
        id: validPizza.id,
        name: validPizza.name,
      });

      expect(stubPizzaCollection.findOneAndUpdate).toHaveBeenCalledTimes(1);
    });

    test('should return a pizza', async () => {
      const result = await pizzaProvider.updatePizza({
        id: validPizza.id,
        name: validPizza.name,
      });

      expect(result).toEqual(toPizzaObject(validPizza));
    });
  });
});
