/* global React, PropTypes, ReactRedux */
// import { store } from './main.js';
import { addTodo, setVizFilter, toggleTodo } from './action_creators.js';

export const Todo = ({onClick, completed, text}) => (
  <li
      onClick={onClick}
      style={{textDecoration: completed ? 'line-through' : 'none'}}
      >
    {text}
  </li>
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

const mapStateToTodoListProps = (state) => {
  return {
    todos: getVisibleTodos(
      state.todos,
      state.visibilityFilter
    )
  };
};

const mapDispatchToTodoListProps = (dispatch) => {
  return {
    onTodoClick: (id) => {
      dispatch(toggleTodo(id));
    }
  };
};

const TodoList = ({todos, onTodoClick}) => (
  <ul>
    {todos.map(todo =>
      <Todo
        key={todo.id}
        {...todo}
        onClick={() => onTodoClick(todo.id)}
      />
    )}
  </ul>
);

const { connect } = ReactRedux;

export const VisibleTodoList = connect(
  mapStateToTodoListProps, mapDispatchToTodoListProps
)(TodoList);

const AddTodoAdvanced = ({ dispatch }) => {
  let input;

  return (
    <div>
      <input ref={node => {
        input = node;
      }} />
      <button onClick = {() => {
        dispatch(addTodo(input.value));
        input.value = '';
      }}>Add Todo
      </button>
    </div>
  );
};

export const AddTodo = connect()(AddTodoAdvanced);

const mapStateToLinkProps = (state, ownProps) => ({
    active: ownProps.filter === state.visibilityFilter
});

const mapDispatchToLinkProps = (dispatch, ownProps) => ({
  onClick: () => {
    dispatch(setVizFilter(ownProps.filter));
  }
});

const Link = ({ active, children, onClick }) => {
  if (active) {
    return <span>{children}</span>;
  }
  return (
    <a
      href='#'
      onClick={e => {
        e.preventDefault();
        onClick();
      }}
      >
        {children}
      </a>
    );
  };

const FilterLink =  connect(mapStateToLinkProps, mapDispatchToLinkProps)(Link);

export const Footer = () => (
  <p>
    Show: {' '}
    <FilterLink
      filter='SHOW_ALL'
      >All</FilterLink>
    {', '}
    <FilterLink
      filter='SHOW_ACTIVE'
      >Active</FilterLink>
    {', '}
    <FilterLink
      filter='SHOW_COMPLETED'
      >Completed</FilterLink>
  </p>
);
