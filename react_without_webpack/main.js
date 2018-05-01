/* global React, ReactDOM, Redux */
import {AddTodo, Footer, VisibleTodoList} from './presentational.js';
import {todos, visibilityFilter} from './reducers.js';

const { createStore, combineReducers } = Redux;

const todoApp = combineReducers({
  todos,
  visibilityFilter
});



const TodoApp = ({store}) => (
  <div>
    <AddTodo store={store}/>
    <VisibleTodoList store={store}/>
    <Footer store={store}/>
  </div>
);


ReactDOM.render(
  <TodoApp store={createStore(todoApp)} />,
  document.getElementById('root')
);
