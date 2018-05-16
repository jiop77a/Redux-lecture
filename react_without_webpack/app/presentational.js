/* global React, PropTypes, ReactRedux, ReactRouterDOM */
// import { store } from './main.js';
import * as actions from './action_creators.js';
import { getVisibleTodos, getIsFetching, getErrorMessage } from './reducers.js';
import { FetchError } from './FetchError.js';


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
    const { filter, fetchTodos } = this.props;
    fetchTodos(filter).then(()=> console.log('done'));
  }

  render() {
    const {toggleTodo, todos, errorMessage, isFetching} = this.props;

    if (isFetching && !todos.length) {
      return <p>Loading...</p>;
    }

    if (errorMessage && !todos.length) {
      return (
        <FetchError
          message={errorMessage}
          onRetry={() => this.fetchData()}
        />
      );
    }
    return (
      <TodoList
        todos={todos}
        onTodoClick={toggleTodo}
      />
    );
  }
}

const mapStateToTodoListProps = (state, { match }) => {
  const filter = match.params.filter || 'all';
  return {
    todos: getVisibleTodos(state, filter),
    errorMessage: getErrorMessage(state, filter),
    isFetching: getIsFetching(state, filter),
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
