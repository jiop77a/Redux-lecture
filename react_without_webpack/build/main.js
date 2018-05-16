/* global React, ReactDOM, Redux, ReactRedux, ReactRouterDOM, _*/

import { configureStore } from './configureStore.js';
import Root from './Root.js';

const store = configureStore();

ReactDOM.render(React.createElement(Root, { store: store }), document.getElementById('root'));

window.store = store;
//# sourceMappingURL=../main.js.map