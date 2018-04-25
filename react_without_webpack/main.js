/* global React, ReactDOM */
import notMain from './not_main.js';

const TodoApp = () => (<h1>{notMain()}</h1>);


ReactDOM.render(
  <TodoApp />,
  document.getElementById('root')
);
