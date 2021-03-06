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

const TodoApp = () => (
  <div>
    <AddTodo/>
    <VisibleTodoList />
    <Footer />
  </div>
);


const Root = ({store }) => (
  <Provider store={store}>
    <BrowserRouter>
      <Route path='/:filter?' component={TodoApp}></Route>
    </BrowserRouter>
  </Provider>
);

export default Root;
