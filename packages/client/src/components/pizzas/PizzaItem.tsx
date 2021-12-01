import { CardContent, CardMedia, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import { Pizza } from '../../types';
import CardItem from '../common/CardItem';

export const useStyles = makeStyles(() => ({
  media: {
    height: 240,
  },

  typo: {
    fontWeight: 320,
    flexGrow: 1,
    textAlign: 'center',
    justify: 'center',
  },
}));

export interface PizzaItemProps {
  pizza?: Pizza;
}

const PizzaItem: React.FC<PizzaItemProps> = ({ pizza }) => {
  const classes = useStyles();
  var pizzaToppingList = pizza?.toppings.map((toppings) => toppings.name).join(', ');

  return (
    <CardItem>
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
    </CardItem>
  );
};

export default PizzaItem;
