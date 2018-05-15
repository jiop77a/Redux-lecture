/* global React, PropTypes, ReactRedux, ReactRouterDOM */
// import { store } from './main.js';
import * as actions from './action_creators.js';
import { addTodo, toggleTodo, receiveTodos } from './action_creators.js';
import { getVisibleTodos } from './reducers.js';
import { fetchTodos } from './fakeDatabase.js';

const { NavLink, withRouter } = ReactRouterDOM;

const Todo = ({onClick, completed, text}) => (
  <li
      onClick={onClick}
      style={{textDecoration: completed ? 'line-through' : 'none'}}
      >
    {text}
  </li>
);

class VisibleTodoListAdvanced extends React.Component {
  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.filter !== prevProps.filter) {
      this.fetchData();
    }
  }

  fetchData() {
    const { filter, receiveTodos } = this.props;
    fetchTodos(this.props.filter).then(todos =>
      receiveTodos(filter, todos)
    );
  }

  render() {
    const {toggleTodo, ...rest} = this.props;
    return (
      <TodoList
        {...rest}
        onTodoClick={toggleTodo}
      />
    );
  }
}

const mapStateToTodoListProps = (state, { match }) => {
  const filter = match.params.filter || 'all';
  return {
    todos: getVisibleTodos(state, filter),
    filter
  };
};


// const mapDispatchToTodoListProps = (dispatch) => ({
//     onTodoClick(id) {
//       dispatch(toggleTodo(id));
//     }
// });

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

export const VisibleTodoList = withRouter(connect(
  mapStateToTodoListProps,
  actions
)(VisibleTodoListAdvanced));

const AddTodoAdvanced = ({ dispatch }) => {
  let input;

  return (
    <div>
      <input ref={node => {
        input = node;
      }} />
      <button onClick = {() => {
        dispatch(actions.addTodo(input.value));
        input.value = '';
      }}>Add Todo
      </button>
    </div>
  );
};

export const AddTodo = connect()(AddTodoAdvanced);

// const mapStateToLinkProps = (state, ownProps) => ({
//     active: ownProps.filter === state.visibilityFilter
// });
//
// const mapDispatchToLinkProps = (dispatch, ownProps) => ({
//   onClick() {
//     dispatch(setVizFilter(ownProps.filter));
//   }
// });

// const Link = ({ active, children, onClick }) => {
//   if (active) {
//     return <span>{children}</span>;
//   }
//   return (
//     <a
//       href='#'
//       onClick={e => {
//         e.preventDefault();
//         onClick();
//       }}
//       >
//         {children}
//       </a>
//     );
//   };
//
// const FilterLink =  connect(mapStateToLinkProps, mapDispatchToLinkProps)(Link);


const FilterLink = ({ filter, children }) => (
  <NavLink
    exact
    to={filter === 'all' ? '/' : `/${filter}`}
    activeStyle={{
      textDecoration: 'none',
      color: 'black'
    }}
  >{children}</NavLink>
);

export const Footer = () => (
  <p>
    Show: {' '}
    <FilterLink
      filter='all'
      >All</FilterLink>
    {', '}
    <FilterLink
      filter='active'
      >Active</FilterLink>
    {', '}
    <FilterLink
      filter='completed'
      >Completed</FilterLink>
  </p>
);
