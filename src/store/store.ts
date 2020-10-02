import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import rootReducer from '../reducers/index';

const configureStore = (preloadedState) => (
  createStore(
    rootReducer,
    preloadedState,
    composeWithDevTools(
      applyMiddleware(thunk)
    )
  )
);

const store = configureStore({});

export default store;

