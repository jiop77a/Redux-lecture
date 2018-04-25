/* global React, ReactDOM */
import notMain from './not_main.js';

const TodoApp = () => React.createElement(
  'h1',
  null,
  notMain()
);

ReactDOM.render(React.createElement(TodoApp, null), document.getElementById('root'));
//# sourceMappingURL=../main.js.map