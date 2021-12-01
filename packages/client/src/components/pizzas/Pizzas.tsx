import React from 'react';
import { useQuery } from '@apollo/client';
import { Container, Grid } from '@material-ui/core';
import PizzaItem from './PizzaItem';
import CardItemSkeleton from '../common/CardItemSkeleton';

import PageHeader from '../common/PageHeader';
import { Pizza } from '../../types';
import { GET_PIZZAS } from '../../hooks/graphql/topping/queries/get-pizzas';

const Pizzas: React.FC = () => {
  const { loading, error, data } = useQuery(GET_PIZZAS);

  if (loading) {
    return <CardItemSkeleton data-testid="pizza-list-loading"> </CardItemSkeleton>;
  }

  if (error) {
    return <p>There was an error loading the data!</p>;
  }

  const pizzaList = data?.pizzas.map((pizza: Pizza) => (
    <PizzaItem data-testid={`pizza-item-${pizza?.id}`} key={pizza.id} pizza={pizza} />
  ));

  return (
    <Container>
      <PageHeader pageHeader={'Pizzas'} />
      <Grid container>
        {pizzaList.map((pizzaCard: Pizza) => (
          <Grid item>{pizzaCard}</Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Pizzas;
