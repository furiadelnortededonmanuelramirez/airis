import { createMuiTheme } from '@material-ui/core';
import palette from './palette';
import typography from './typography';

const theme = createMuiTheme({
  palette,
  typography,
  breakpoints: {
    values: {
      xs: 1200,
      sm: 1200,
      md: 1200,
      lg: 1200,
      xl: 1200,
    },
  },
});

export default theme;
