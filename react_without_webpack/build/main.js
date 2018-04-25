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

let nextTodoId = 0;

class TodoApp extends Component {
  render() {
    return React.createElement(
      'div',
      null,
      React.createElement(
        'button',
        { onClick: () => {
            store.dispatch({
              type: 'ADD_TODO',
              text: 'Test',
              id: nextTodoId++
            });
          } },
        'Add Todo'
      ),
      React.createElement(
        'ul',
        null,
        this.props.todos.map(todo => React.createElement(
          'li',
          { key: todo.id },
          todo.text
        ))
      )
    );
  }
}

const render = () => {
  ReactDOM.render(React.createElement(TodoApp, {
    todos: store.getState().todos
  }), document.getElementById('root'));
};

store.subscribe(render);
render();
//# sourceMappingURL=../main.js.map