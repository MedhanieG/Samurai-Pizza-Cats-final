import { gql } from 'apollo-server';

const typeDefs = gql`
  type Pizza {
    id: ObjectID!
    name: String!
    description: String!
    toppings: [Topping!]!

    imgSrc: String!
  }

  type Query {
    pizzas: [Pizza!]!
  }
`;
export { typeDefs };
