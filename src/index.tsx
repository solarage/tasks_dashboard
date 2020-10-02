import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

import store from './store/store';

import App from './App';

render(
  <Provider store={store}>
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <App />
    </MuiPickersUtilsProvider>
  </Provider>,
  document.getElementById('app')
);
