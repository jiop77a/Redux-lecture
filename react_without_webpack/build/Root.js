/* global React, ReactDOM, Redux, ReactRedux _*/
import { AddTodo, Footer, VisibleTodoList } from './presentational.js';

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

const TodoApp = () => React.createElement(
  'div',
  null,
  React.createElement(AddTodo, null),
  React.createElement(VisibleTodoList, null),
  React.createElement(Footer, null)
);

const Root = ({ store }) => React.createElement(
  Provider,
  { store: store },
  React.createElement(TodoApp, null)
);

export default Root;
//# sourceMappingURL=../Root.js.map