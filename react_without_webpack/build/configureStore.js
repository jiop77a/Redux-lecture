/* global React, ReactDOM, Redux, ReactRedux, reduxLogger _*/
// import {loadState, saveState} from './localStorage.js';
import { todoApp } from './reducers.js';

const { createStore, applyMiddleware } = Redux;

const { createLogger } = reduxLogger;

const thunk = store => next => action => typeof action === 'function' ? action(store.dispatch) : next(action);

export const configureStore = () => {
  // const persistedState = loadState();

  const middlewares = [thunk, createLogger()];

  const store = createStore(todoApp, applyMiddleware(...middlewares));
  return store;
};
//# sourceMappingURL=../configureStore.js.map