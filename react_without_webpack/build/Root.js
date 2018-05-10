/* global React, ReactDOM, Redux, ReactRedux, ReactRouterDOM, _*/
import { AddTodo, Footer, VisibleTodoList } from './presentational.js';

const { Provider } = ReactRedux;
const { BrowserRouter, Route, withRouter } = ReactRouterDOM;

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

const TodoApp = () => React.createElement(
  'div',
  null,
  React.createElement(AddTodo, null),
  React.createElement(VisibleTodoList, null),
  React.createElement(Footer, null)
);

// const App = withRouter(TodoApp);

const Root = ({ store }) => React.createElement(
  Provider,
  { store: store },
  React.createElement(
    BrowserRouter,
    null,
    React.createElement(Route, { path: '/:filter?', component: TodoApp })
  )
);

export default Root;
//# sourceMappingURL=../Root.js.map