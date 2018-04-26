/* global React, ReactDOM, Redux */
import { Todo, TodoList } from './presentational.js';
import { todo, todos, visibilityFilter } from './reducers.js';

const { createStore, combineReducers } = Redux;

const todoApp = combineReducers({
  todos,
  visibilityFilter
});

const store = createStore(todoApp);

const { Component } = React;

const FilterLink = ({ filter, currentFilter, children }) => {
  if (filter === currentFilter) {
    return React.createElement(
      'span',
      null,
      children
    );
  }
  return React.createElement(
    'a',
    {
      href: '#',
      onClick: e => {
        e.preventDefault();
        store.dispatch({
          type: 'SET_VISIBILITY_FILTER',
          filter
        });
      }
    },
    children
  );
};

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
class TodoApp extends Component {
  render() {
    const { todos, visibilityFilter } = this.props;
    const visibleTodos = getVisibleTodos(todos, visibilityFilter);
    return React.createElement(
      'div',
      null,
      React.createElement('input', { ref: node => {
          this.input = node;
        } }),
      React.createElement(
        'button',
        { onClick: () => {
            store.dispatch({
              type: 'ADD_TODO',
              text: this.input.value,
              id: nextTodoId++
            });
            this.input.value = '';
          } },
        'Add Todo'
      ),
      React.createElement(TodoList, {
        todos: visibleTodos,
        onTodoClick: id => store.dispatch({
          type: 'TOGGLE_TODO',
          id
        }) }),
      React.createElement(
        'p',
        null,
        'Show: ',
        ' ',
        React.createElement(
          FilterLink,
          {
            filter: 'SHOW_ALL',
            currentFilter: visibilityFilter },
          'All'
        ),
        ', ',
        React.createElement(
          FilterLink,
          {
            filter: 'SHOW_ACTIVE',
            currentFilter: visibilityFilter
          },
          'Active'
        ),
        ', ',
        React.createElement(
          FilterLink,
          {
            filter: 'SHOW_COMPLETED',
            currentFilter: visibilityFilter
          },
          'Completed'
        )
      )
    );
  }
}

const render = () => {
  ReactDOM.render(React.createElement(TodoApp, store.getState()), document.getElementById('root'));
};

store.subscribe(render);
render();
//# sourceMappingURL=../main.js.map