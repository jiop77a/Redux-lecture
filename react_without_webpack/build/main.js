/* global React, ReactDOM, Redux, ReactRedux */
import { AddTodo, Footer, VisibleTodoList } from './presentational.js';
import { todos, visibilityFilter } from './reducers.js';
import { loadState, saveState } from './localStorage.js';

const { Provider } = ReactRedux;

// class Provider extends React.Component {
//   getChildContext() {
//     return {
//       store: this.props.store
//     };
//   }
//
//   render(){
//     return this.props.children;
//   }
// }
//
// Provider.childContextTypes = {
//   store: PropTypes.object
// };


const { createStore, combineReducers } = Redux;

const todoApp = combineReducers({
  todos,
  visibilityFilter
});

const TodoApp = () => React.createElement(
  'div',
  null,
  React.createElement(AddTodo, null),
  React.createElement(VisibleTodoList, null),
  React.createElement(Footer, null)
);

const persistedState = loadState();

// {
//   todos: [{
//       id: '0',
//       text: 'Welcome back!',
//       completed: false
//   }]
// };

const store = createStore(todoApp, persistedState);

store.subscribe(() => {
  saveState(store.getState());
});

console.log(store.getState());

ReactDOM.render(React.createElement(
  Provider,
  { store: store },
  React.createElement(TodoApp, null)
), document.getElementById('root'));
//# sourceMappingURL=../main.js.map