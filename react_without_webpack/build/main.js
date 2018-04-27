/* global React, ReactDOM, Redux */
import { Todo, TodoList, AddTodo, Footer } from './presentational.js';
import { todo, todos, visibilityFilter } from './reducers.js';

const { createStore, combineReducers } = Redux;

const todoApp = combineReducers({
  todos,
  visibilityFilter
});

export const store = createStore(todoApp);

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed);
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed);
  }
};

let nextTodoId = 0;
const TodoApp = ({ todos, visibilityFilter }) => React.createElement(
  'div',
  null,
  React.createElement(AddTodo, {
    onAddClick: text => store.dispatch({
      type: 'ADD_TODO',
      id: nextTodoId++,
      text
    })
  }),
  React.createElement(TodoList, {
    todos: getVisibleTodos(todos, visibilityFilter),
    onTodoClick: id => store.dispatch({
      type: 'TOGGLE_TODO',
      id
    }) }),
  React.createElement(Footer, {
    visibilityFilter: visibilityFilter,
    onFilterClick: filter => store.dispatch({
      type: 'SET_VISIBILITY_FILTER',
      filter
    })
  })
);

const render = () => {
  ReactDOM.render(React.createElement(TodoApp, store.getState()), document.getElementById('root'));
};

store.subscribe(render);
render();
//# sourceMappingURL=../main.js.map