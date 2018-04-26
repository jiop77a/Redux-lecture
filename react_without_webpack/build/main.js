var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/* global React, ReactDOM, Redux */
// import notMain from './not_main.js';

const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false
      };
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state;
      }
      return _extends({}, state, {
        completed: !state.completed
      });
    default:
      return state;
  }
};

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, todo(undefined, action)];
    case 'TOGGLE_TODO':
      return state.map(t => todo(t, action));

    default:
      return state;
  }
};

const visibilityFilter = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
};

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
      React.createElement(
        'ul',
        null,
        visibleTodos.map(todo => React.createElement(
          'li',
          { key: todo.id,
            onClick: () => {
              store.dispatch({
                type: 'TOGGLE_TODO',
                id: todo.id
              });
            },
            style: {
              textDecoration: todo.completed ? 'line-through' : 'none'
            } },
          todo.text
        ))
      ),
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
        ' ',
        React.createElement(
          FilterLink,
          {
            filter: 'SHOW_ACTIVE',
            currentFilter: visibilityFilter
          },
          'Active'
        ),
        ' ',
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