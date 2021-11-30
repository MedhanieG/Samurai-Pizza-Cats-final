import { Card, CardContent, CardMedia, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import { Pizza } from '../../types';

export const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 300,
    minWidth: 300,
    minHeight: 450,
    maxHeight: 550,
    margin: '3rem',
    alignItems: 'center',
    justifyContent: 'center',
    transition: '0.3s',
    boxShadow: '0 8px 40px -12px rgba(0,0,0,0.1)',
    '&:hover': {
      boxShadow: '0 16px 70px -12.125px rgba(0,0,0,0.5)',
    },
  },

  media: {
    height: 240,
  },

  typo: {
    flexGrow: 1,
    textAlign: 'center',
    justify: 'center',
    color: 'text.secondary',
  },
}));

export interface PizzaItemProps {
  pizza?: Pizza;
}

const PizzaItem: React.FC<PizzaItemProps> = ({ pizza }) => {
  const classes = useStyles();
  var pizzaToppingList = pizza?.toppings.map((toppings) => toppings.name).join(', ');

  return (
    <Card className={classes.root}>
      <CardMedia className={classes.media} component="img" image={pizza?.imgSrc} />

      <CardContent className={classes.typo}>
        <Typography gutterBottom variant="h5" component="div">
          {pizza?.name}
        </Typography>

        <Typography gutterBottom variant="subtitle1">
          {pizza?.description}
        </Typography>

        <Typography gutterBottom variant="body2" className={classes.typo}>
          {pizzaToppingList}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PizzaItem;
