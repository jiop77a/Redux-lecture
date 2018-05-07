/* global React, ReactDOM, Redux, ReactRedux */
import {AddTodo, Footer, VisibleTodoList} from './presentational.js';
import {todos, visibilityFilter} from './reducers.js';

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

const TodoApp = () => (
  <div>
    <AddTodo/>
    <VisibleTodoList />
    <Footer />
  </div>
);

const persistedState = {
  todos: [{
      id: '0',
      text: 'Welcome back!',
      completed: false
  }]
};

const store = createStore(todoApp, persistedState);


console.log(store.getState());

ReactDOM.render(
  <Provider store={store}>
    <TodoApp/>
  </Provider>,
  document.getElementById('root')
);
