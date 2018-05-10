var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/* global React, PropTypes, ReactRedux */
// import { store } from './main.js';
import { addTodo, setVizFilter, toggleTodo } from './action_creators.js';

const Todo = ({ onClick, completed, text }) => React.createElement(
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

const mapStateToTodoListProps = state => ({
  todos: getVisibleTodos(state.todos, state.visibilityFilter)
});

const mapDispatchToTodoListProps = dispatch => ({
  onTodoClick(id) {
    dispatch(toggleTodo(id));
  }
});

const TodoList = ({ todos, onTodoClick }) => React.createElement(
  'ul',
  null,
  todos.map(todo => React.createElement(Todo, _extends({
    key: todo.id
  }, todo, {
    onClick: () => onTodoClick(todo.id)
  })))
);

const { connect } = ReactRedux;

export const VisibleTodoList = connect(mapStateToTodoListProps, mapDispatchToTodoListProps)(TodoList);

const AddTodoAdvanced = ({ dispatch }) => {
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
          dispatch(addTodo(input.value));
          input.value = '';
        } },
      'Add Todo'
    )
  );
};

export const AddTodo = connect()(AddTodoAdvanced);

const mapStateToLinkProps = (state, ownProps) => ({
  active: ownProps.filter === state.visibilityFilter
});

const mapDispatchToLinkProps = (dispatch, ownProps) => ({
  onClick() {
    dispatch(setVizFilter(ownProps.filter));
  }
});

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

const FilterLink = connect(mapStateToLinkProps, mapDispatchToLinkProps)(Link);

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