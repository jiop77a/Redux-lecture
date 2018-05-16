var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/* global React, PropTypes, ReactRedux, ReactRouterDOM */
// import { store } from './main.js';
import * as actions from './action_creators.js';
import { getVisibleTodos, getIsFetching } from './reducers.js';

const { NavLink, withRouter } = ReactRouterDOM;

const Todo = ({ onClick, completed, text }) => React.createElement(
  'li',
  {
    onClick: onClick,
    style: { textDecoration: completed ? 'line-through' : 'none' }
  },
  text
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
    const { filter, requestTodos, fetchTodos } = this.props;
    requestTodos(filter);
    fetchTodos(filter);
  }

  render() {
    const { toggleTodo, todos, isFetching } = this.props;
    if (isFetching && !todos.length) {
      return React.createElement(
        'p',
        null,
        'Loading...'
      );
    }
    return React.createElement(TodoList, {
      todos: todos,
      onTodoClick: toggleTodo
    });
  }
}

const mapStateToTodoListProps = (state, { match }) => {
  const filter = match.params.filter || 'all';
  return {
    todos: getVisibleTodos(state, filter),
    isFetching: getIsFetching(state, filter),
    filter
  };
};

// const mapDispatchToTodoListProps = (dispatch) => ({
//     onTodoClick(id) {
//       dispatch(toggleTodo(id));
//     }
// });

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

export const VisibleTodoList = withRouter(connect(mapStateToTodoListProps, actions)(VisibleTodoListAdvanced));

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
          dispatch(actions.addTodo(input.value));
          input.value = '';
        } },
      'Add Todo'
    )
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


const FilterLink = ({ filter, children }) => React.createElement(
  NavLink,
  {
    exact: true,
    to: filter === 'all' ? '/' : `/${filter}`,
    activeStyle: {
      textDecoration: 'none',
      color: 'black'
    }
  },
  children
);

export const Footer = () => React.createElement(
  'p',
  null,
  'Show: ',
  ' ',
  React.createElement(
    FilterLink,
    {
      filter: 'all'
    },
    'All'
  ),
  ', ',
  React.createElement(
    FilterLink,
    {
      filter: 'active'
    },
    'Active'
  ),
  ', ',
  React.createElement(
    FilterLink,
    {
      filter: 'completed'
    },
    'Completed'
  )
);
//# sourceMappingURL=../presentational.js.map