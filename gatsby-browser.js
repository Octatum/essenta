import React from 'react';
import { Provider } from 'mobx-react';
import { ThemeProvider } from 'styled-components';

import CartStore from './src/stores/CartStore';
import { globalTheme } from './src/utilities/themes';

export const wrapRootElement = ({ element }) => {
  // props provide same data to Layout as Page element will get
  // including location, data, etc - you don't need to pass it
  const cartStore = new CartStore();

  return (
    <ThemeProvider theme={globalTheme}>
      <Provider cartStore={cartStore}>{element}</Provider>
    </ThemeProvider>
  );
};
