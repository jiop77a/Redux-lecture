var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

export const Todo = ({ onClick, completed, text }) => React.createElement(
  'li',
  {
    onClick: onClick,
    style: {
      textDecoration: completed ? 'line-through' : 'none'
    } },
  text
);

export const TodoList = ({ todos, onTodoClick }) => React.createElement(
  'ul',
  null,
  todos.map(todo => React.createElement(Todo, _extends({
    key: todo.id
  }, todo, {
    onClick: () => onTodoClick(todo.id)
  })))
);

export const AddTodo = ({ onAddClick }) => {
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
          onAddClick(input.value);
          input.value = '';
        } },
      'Add Todo'
    )
  );
};

export const FilterLink = ({ filter, currentFilter, children, onClick }) => {
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
        onClick(filter);
      }
    },
    children
  );
};

export const Footer = ({ visibilityFilter, onFilterClick }) => React.createElement(
  'p',
  null,
  'Show: ',
  ' ',
  React.createElement(
    FilterLink,
    {
      filter: 'SHOW_ALL',
      currentFilter: visibilityFilter,
      onClick: onFilterClick },
    'All'
  ),
  ', ',
  React.createElement(
    FilterLink,
    {
      filter: 'SHOW_ACTIVE',
      currentFilter: visibilityFilter,
      onClick: onFilterClick
    },
    'Active'
  ),
  ', ',
  React.createElement(
    FilterLink,
    {
      filter: 'SHOW_COMPLETED',
      currentFilter: visibilityFilter,
      onClick: onFilterClick
    },
    'Completed'
  )
);
//# sourceMappingURL=../presentational.js.map