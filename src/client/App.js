import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import lightBlue from '@material-ui/core/colors/blue';
import deepOrange from '@material-ui/core/colors/deepOrange';

import Header from './Header';
import Main from './Main';
//import './styles/app.css';


const theme = createMuiTheme({
  palette: {
    primary: lightBlue,
    secondary: deepOrange,
  },
});

const App = () => (
  <React.Fragment>
    <CssBaseline />
    <MuiThemeProvider theme={theme}>
      <div>
        <Header />
        <Main />
      </div>
    </MuiThemeProvider>
  </React.Fragment>
);

export default App;