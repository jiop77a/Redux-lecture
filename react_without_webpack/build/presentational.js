var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/*global React*/
import { store } from './main.js';

export const Todo = ({ onClick, completed, text }) => React.createElement(
  'li',
  {
    onClick: onClick,
    style: { textDecoration: completed ? 'line-through' : 'none' }
  },
  text
);

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

export class VisibleTodoList extends React.Component {

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => this.forceUpdate());
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const props = this.props;
    const state = store.getState();

    return React.createElement(TodoList, {
      todos: getVisibleTodos(state.todos, state.visibilityFilter),
      onTodoClick: id => store.dispatch({
        type: 'TOGGLE_TODO',
        id
      })
    });
  }
}

const TodoList = ({ todos, onTodoClick }) => React.createElement(
  'ul',
  null,
  todos.map(todo => React.createElement(Todo, _extends({
    key: todo.id
  }, todo, {
    onClick: () => onTodoClick(todo.id)
  })))
);

let nextTodoId = 0;
export const AddTodo = () => {
  let input;

  return React.createElement(
    'div',
    null,
    React.createElement('input', { ref: node => {
        input = node;
      } }),
    React.createElement(
      'button',
      { onClick: () => {
          store.dispatch({
            type: 'ADD_TODO',
            id: nextTodoId++,
            text: input.value
          });
          input.value = '';
        } },
      'Add Todo'
    )
  );
};

class FilterLink extends React.Component {
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => this.forceUpdate());
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const props = this.props;
    const state = store.getState();

    return React.createElement(
      Link,
      {
        active: props.filter === state.visibilityFilter,
        onClick: () => store.dispatch({
          type: 'SET_VISIBILITY_FILTER',
          filter: props.filter
        })
      },
      props.children
    );
  }
}

const Link = ({ active, children, onClick }) => {
  if (active) {
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
        onClick();
      }
    },
    children
  );
};

export const Footer = () => React.createElement(
  'p',
  null,
  'Show: ',
  ' ',
  React.createElement(
    FilterLink,
    {
      filter: 'SHOW_ALL'
    },
    'All'
  ),
  ', ',
  React.createElement(
    FilterLink,
    {
      filter: 'SHOW_ACTIVE'
    },
    'Active'
  ),
  ', ',
  React.createElement(
    FilterLink,
    {
      filter: 'SHOW_COMPLETED'
    },
    'Completed'
  )
);
//# sourceMappingURL=../presentational.js.map