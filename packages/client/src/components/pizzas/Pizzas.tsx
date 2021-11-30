import React from 'react';
import { useQuery } from '@apollo/client';
import { makeStyles } from '@material-ui/styles';
import { Container, Grid } from '@material-ui/core';
import PizzaItem from './PizzaItem';

import PageHeader from '../common/PageHeader';
import { Pizza } from '../../types';
import { GET_PIZZAS } from '../../hooks/graphql/topping/queries/get-pizzas';

export const useStyles = makeStyles(() => ({
  skeleton: {
    display: 'flex',
    justifyContent: 'center',
    verticalAlign: 'center',
  },
}));

const Pizzas: React.FC = () => {
  const classes = useStyles();
  const { loading, data } = useQuery(GET_PIZZAS);

  if (loading) {
    return <div className={classes.skeleton}>Loading ...</div>;
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
