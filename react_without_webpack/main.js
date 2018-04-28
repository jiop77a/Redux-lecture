/* global React, ReactDOM, Redux */
import {AddTodo, Footer, VisibleTodoList} from './presentational.js';
import {todos, visibilityFilter} from './reducers.js';

const { createStore, combineReducers } = Redux;

const todoApp = combineReducers({
  todos,
  visibilityFilter
});

export const store = createStore(todoApp);


const TodoApp = () => (
  <div>
    <AddTodo/>
    <VisibleTodoList/>
    <Footer/>
  </div>
);


ReactDOM.render(
  <TodoApp />,
  document.getElementById('root')
);
