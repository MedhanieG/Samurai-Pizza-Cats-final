import React from 'react';
import { Card, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    maxWidth: 300,
    minWidth: 300,
    margin: '3rem',
    justifyContent: 'center',
    transition: '0.3s',
    boxShadow: '0 8px 40px -12px rgba(1,0,0,0.1)',
    '&:hover': {
      transform: 'scale(1.02) perspective(0px)',
      boxShadow: '0 16px 70px -12.125px rgba(1,0,0,0.5)',
      cursor: 'pointer',
    },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    height: theme.typography.pxToRem(500),
  },
}));

interface CardItemProps {
  children?: React.ReactNode;
  onClick?: () => void;
  rootClassName?: string;
}

const CardItem = ({ children, onClick, rootClassName, ...props }: CardItemProps): JSX.Element => {
  const classes = useStyles();

  return (
    <Card {...props} className={`${classes.root} ${rootClassName}`} onClick={onClick}>
      {children}
    </Card>
  );
};

export default CardItem;
