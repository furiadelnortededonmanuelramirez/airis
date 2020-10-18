import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import muiTheme from '../../config/muiTheme';
import { ThemeProvider } from '@material-ui/core/styles';
import Dashboard from '../Dashboard';

const App = () => (
  <ThemeProvider theme={muiTheme}>
    <Router>
      <Switch>
        <Route component={Dashboard} />
      </Switch>
    </Router>
  </ThemeProvider>
);

export default App;
