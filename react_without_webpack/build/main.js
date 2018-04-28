/* global React, ReactDOM, Redux */
import { AddTodo, Footer, VisibleTodoList } from './presentational.js';
import { todos, visibilityFilter } from './reducers.js';

const { createStore, combineReducers } = Redux;

const todoApp = combineReducers({
  todos,
  visibilityFilter
});

export const store = createStore(todoApp);

const TodoApp = () => React.createElement(
  'div',
  null,
  React.createElement(AddTodo, null),
  React.createElement(VisibleTodoList, null),
  React.createElement(Footer, null)
);

ReactDOM.render(React.createElement(TodoApp, null), document.getElementById('root'));
//# sourceMappingURL=../main.js.map