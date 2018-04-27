/*global React*/
import { store } from './main.js';

export const Todo = ({onClick, completed, text}) => (
  <li
      onClick={onClick}
      style={{
        textDecoration: completed ? 'line-through' : 'none'
      }}>
    {text}
  </li>
);

export const TodoList = ({todos, onTodoClick}) => (
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

export const AddTodo = ({ onAddClick }) => {
  let input;
  return (
    <div>
      <input ref={node => {
        input = node;
      }} />
      <button onClick = {() => {
        onAddClick(input.value);
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
