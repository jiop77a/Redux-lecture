/*global React*/
import { store } from './main.js';

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

export class VisibleTodoList extends React.Component {

  componentDidMount() {
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    );
  }

  componentWillUnmount(){
    this.unsubscribe();
  }

  render() {
    const props = this.props;
    const state = store.getState();

    return (
      <TodoList
        todos={
          getVisibleTodos(
            state.todos,
            state.visibilityFilter
          )
        }
        onTodoClick={id =>
          store.dispatch({
            type: 'TOGGLE_TODO',
            id
          })
        }
      />
    );
  }
}

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

let nextTodoId = 0;
export const AddTodo = () => {
  let input;
  
  return (
    <div>
      <input ref={node => {
        input = node;
      }} />
      <button onClick = {() => {
        store.dispatch({
          type: 'ADD_TODO',
          id: nextTodoId++,
          text: input.value
        });
        input.value = '';
      }}>Add Todo
      </button>
    </div>
  );
};

class FilterLink extends React.Component {
  componentDidMount() {
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    );
  }

  componentWillUnmount(){
    this.unsubscribe();
  }

  render() {
    const props = this.props;
    const state = store.getState();

    return (
      <Link
        active = { props.filter === state.visibilityFilter }
        onClick = {() =>
          store.dispatch({
            type: 'SET_VISIBILITY_FILTER',
            filter: props.filter
          })
        }
      >
        {props.children}
      </Link>
    );
  }
}

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
