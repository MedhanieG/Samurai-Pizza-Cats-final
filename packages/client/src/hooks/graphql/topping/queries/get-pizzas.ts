import { gql } from '@apollo/client';

const GET_PIZZAS = gql`
  query Pizzas {
    pizzas {
      toppings {
        id
        name
        priceCents
      }
      id
      name
      description
      imgSrc
      priceCents
    }
  }
`;

export { GET_PIZZAS };
