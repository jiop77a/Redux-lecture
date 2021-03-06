/* global React, ReactDOM, Redux, ReactRedux, ReactRouterDOM, _*/

import {configureStore} from './configureStore.js';
import Root from './Root.js';

const store = configureStore();

ReactDOM.render(
  <Root store={store}></Root>,
  document.getElementById('root')
);

window.store = store;
