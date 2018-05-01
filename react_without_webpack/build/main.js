/* global React, ReactDOM, Redux */
import { AddTodo, Footer, VisibleTodoList } from './presentational.js';
import { todos, visibilityFilter } from './reducers.js';

const { createStore, combineReducers } = Redux;

const todoApp = combineReducers({
  todos,
  visibilityFilter
});

const TodoApp = ({ store }) => React.createElement(
  'div',
  null,
  React.createElement(AddTodo, { store: store }),
  React.createElement(VisibleTodoList, { store: store }),
  React.createElement(Footer, { store: store })
);

ReactDOM.render(React.createElement(TodoApp, { store: createStore(todoApp) }), document.getElementById('root'));
//# sourceMappingURL=../main.js.map