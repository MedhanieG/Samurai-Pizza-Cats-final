import { gql } from '@apollo/client';

export const GET_PIZZA = gql`
  query Get_Pizza($pizzaId: ObjectID!) {
    pizza(id: $pizzaId) {
      toppings {
        id
        name
        priceCents
      }
      id
      name
      description
      imgSrc
    }
  }
`;
