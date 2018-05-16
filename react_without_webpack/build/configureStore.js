/* global React, ReactDOM, Redux, ReactRedux _*/
// import {loadState, saveState} from './localStorage.js';
import { todoApp } from './reducers.js';

const { createStore } = Redux;

const logger = store => next => action => {
  console.group(action.type);
  console.log('%c prev state', 'color: gray', store.getState());
  console.log('%c action', 'color: blue', action);
  const returnValue = next(action);
  console.log('%c next state', 'color: green', store.getState());
  console.groupEnd(action.type);
  return returnValue;
};

const promise = store => next => action => {
  if (typeof action.then === 'function') {
    return action.then(next);
  }
  return next(action);
};

const wrapDispatchWithMiddlewares = (store, middlewares) => {
  middlewares.slice().reverse().forEach(middleware => {
    store.dispatch = middleware(store)(store.dispatch);
  });
};

export const configureStore = () => {
  // const persistedState = loadState();

  const store = createStore(todoApp);
  const middlewares = [promise, logger];

  wrapDispatchWithMiddlewares(store, middlewares);

  // store.subscribe(_.throttle(() => {
  //   saveState({
  //     todos: store.getState().todos
  //   });
  // }, 1000));

  return store;
};
//# sourceMappingURL=../configureStore.js.map