/* global React, ReactDOM, Redux, ReactRedux _*/
import {loadState, saveState} from './localStorage.js';
import {todoApp} from './reducers.js';

const { createStore } = Redux;

export const configureStore = () => {
  const persistedState = loadState();

  const store = createStore(todoApp, persistedState);

  store.subscribe(_.throttle(() => {
    saveState({
      todos: store.getState().todos
    });
  }, 1000));

  return store;
};
