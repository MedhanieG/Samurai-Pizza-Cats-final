import { gql } from 'apollo-server-core';

import { toppingResolver } from '../../src/application/resolvers/topping.resolver';
import { toppingProvider } from '../../src/application/providers';
import { pizzaResolver } from '../../src/application/resolvers/pizza.resolver';
import { pizzaProvider } from '../../src/application/providers';
import { typeDefs } from '../../src/application/schema/index';
import {
  MutationCreatePizzaArgs,
  MutationDeletePizzaArgs,
  MutationUpdatePizzaArgs,
} from '../../src/application/schema/types/schema';
import { createMockTopping } from '../helpers/topping.helper';
import { createMockPizza } from '../helpers/pizza.helper';
import { TestClient } from '../helpers/client.helper';
import { ObjectId } from 'mongodb';

let client: TestClient;

jest.mock('../../src/application/database', () => ({
  setupDb: (): any => ({ collection: (): any => jest.fn() }),
}));

const mockPizza = createMockPizza();
const mockTopping = createMockTopping();

beforeAll(async (): Promise<void> => {
  client = new TestClient(typeDefs, [pizzaResolver, toppingResolver]);
});

beforeEach(async (): Promise<void> => {
  jest.restoreAllMocks();
});

describe('pizzaResolver', (): void => {
  describe('Query', () => {
    describe('pizzas', () => {
      const query = gql`
        query getPizza {
          pizzas {
            id
            name
            description
            imgSrc
          }
        }
      `;
      test('should get all pizzas', async () => {
        jest.spyOn(pizzaProvider, 'getPizza').mockResolvedValue([mockPizza]);
        const result = await client.query({ query });
        const resilt = result.data?.toppings;

        expect(result.data).toEqual({
          pizzas: [
            {
              __typename: 'Pizza',
              id: mockPizza.id,
              name: mockPizza.name,
              description: mockPizza.description,
              imgSrc: mockPizza.imgSrc,
            },
          ],
        });

        expect(pizzaProvider.getPizza).toHaveBeenCalledTimes(1);
      });
    });
  });
  describe('Mutation', () => {
    describe('createPizza', () => {
      const mutation = gql`
        mutation ($input: CreatePizzaInput!) {
          createPizza(input: $input) {
            id
            name
            description
            imgSrc
          }
        }
      `;

      const validPizza = createMockPizza({
        name: 'test pizza',
        description: 'test pizza description',
        imgSrc:
          'https://images.pexels.com/photos/905847/pexels-photo-905847.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        toppingIds: [new ObjectId('564f0184537878b57efcb703')],
      });

      beforeEach(() => {
        jest.spyOn(pizzaProvider, 'createPizza').mockResolvedValue(validPizza);
      });

      test('should call create pizza when passed a valid input', async () => {
        const variables: MutationCreatePizzaArgs = {
          input: {
            name: validPizza.name,
            description: validPizza.description,
            imgSrc: validPizza.imgSrc,
            toppingIds: validPizza.toppingIds,
          },
        };

        await client.mutate({ mutation, variables });

        expect(pizzaProvider.createPizza).toHaveBeenCalledWith(variables.input);
      });
      test('should return created pizza when passed a valid input', async () => {
        const variables: MutationCreatePizzaArgs = {
          input: {
            name: validPizza.name,
            description: validPizza.description,
            imgSrc: validPizza.imgSrc,
            toppingIds: validPizza.toppingIds,
          },
        };

        const result = await client.mutate({ mutation, variables });

        expect(result.data).toEqual({
          createPizza: {
            __typename: 'Pizza',
            id: result.data?.createPizza.id,
            name: validPizza.name,
            description: validPizza.description,
            imgSrc: validPizza.imgSrc,
          },
        });
      });
    });

    describe('deletePizza', () => {
      const mutation = gql`
        mutation ($input: DeletePizzaInput!) {
          deletePizza(input: $input)
        }
      `;

      const variables: MutationDeletePizzaArgs = { input: { id: mockPizza.id } };

      beforeEach(() => {
        jest.spyOn(pizzaProvider, 'deletePizza').mockResolvedValue(mockPizza.id);
      });

      test('should call deletePizza with id', async () => {
        await client.mutate({ mutation, variables });

        expect(pizzaProvider.deletePizza).toHaveBeenCalledWith(variables.input.id);
      });

      test('should return deleted pizza id', async () => {
        const result = await client.mutate({ mutation, variables });

        expect(result.data).toEqual({
          deletePizza: mockPizza.id,
        });
      });
    });

    describe('updatePizza', () => {
      const mutation = gql`
        mutation ($input: UpdatePizzaInput!) {
          updatePizza(input: $input) {
            id
            name
            description
            imgSrc
            toppingIds
          }
        }
      `;
      const updatedPizza = createMockPizza({
        name: 'updated pizza',
        description: 'updated description',
        imgSrc:
          'https://images.pexels.com/photos/905847/pexels-photo-905847.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=600',
      });

      const variables: MutationUpdatePizzaArgs = {
        input: {
          id: mockPizza.id,
          name: updatedPizza.name,
          description: updatedPizza.description,
          imgSrc: updatedPizza.imgSrc,
        },
      };

      beforeEach(() => {
        jest.spyOn(pizzaProvider, 'updatePizza').mockResolvedValue(updatedPizza);
      });

      test('should call updatePizza with input', async () => {
        await client.mutate({ mutation, variables });

        expect(pizzaProvider.updatePizza).toHaveBeenCalledWith(variables.input);
      });

      test('should return updated pizza', async () => {
        const result = await client.mutate({ mutation, variables });

        expect(result.data).toEqual({
          updatePizza: {
            __typename: 'Pizza',
            id: updatedPizza.id,
            name: updatedPizza.name,
            description: updatedPizza.description,
            imgSrc: updatedPizza.imgSrc,
          },
        });
      });
    });
  });
});
