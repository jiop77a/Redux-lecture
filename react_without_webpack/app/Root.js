/* global React, ReactDOM, Redux, ReactRedux _*/
import {AddTodo, Footer, VisibleTodoList} from './presentational.js';

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

const TodoApp = () => (
  <div>
    <AddTodo/>
    <VisibleTodoList />
    <Footer />
  </div>
);

const Root = ({store }) => (
  <Provider store={store}>
    <TodoApp/>
  </Provider>
);

export default Root;
