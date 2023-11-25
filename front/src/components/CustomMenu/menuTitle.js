import React from 'react';
import { Stack } from '@mui/material';
import { Typography } from '@mui/material';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

const MenuTitle = () => {
  return (
    <Stack direction="row" spacing={5} alignItems="center">
      <Typography variant="h4">Ingrédients du menu</Typography>
      <ShoppingBasketIcon fontSize="large" />
    </Stack>
  );
};

export default MenuTitle;
