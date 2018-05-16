/* global React, ReactDOM, Redux, ReactRedux, reduxLogger, ReduxThunk*/
// import {loadState, saveState} from './localStorage.js';
import { todoApp } from './reducers.js';

const { createStore, applyMiddleware } = Redux;
const thunk = ReduxThunk.default;
const { createLogger } = reduxLogger;

export const configureStore = () => {
  // const persistedState = loadState();

  const middlewares = [thunk, createLogger()];

  const store = createStore(todoApp, applyMiddleware(...middlewares));
  return store;
};
//# sourceMappingURL=../configureStore.js.map