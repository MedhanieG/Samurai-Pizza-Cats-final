import { gql } from 'apollo-server';

const typeDefs = gql`
  type Pizza {
    id: ObjectID!
    name: String!
    description: String!
    toppingIds: [String!]!
    imgSrc: String!
  }

  type Query {
    pizzas: [Pizza!]!
  }

  input PizzasQueryArgs {
    id: ObjectID!
  }
`;

export { typeDefs };
