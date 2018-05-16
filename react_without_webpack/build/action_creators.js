/*global uuidv4*/
import * as api from './fakeDatabase.js';

export const addTodo = text => ({
  type: 'ADD_TODO',
  id: uuidv4(),
  text
});
//
// export const setVizFilter = (filter) => ({
//   type: 'SET_VISIBILITY_FILTER',
//   filter
// });

export const toggleTodo = id => ({
  type: 'TOGGLE_TODO',
  id
});

const receiveTodos = (filter, response) => ({
  type: 'RECEIVE_TODOS',
  filter,
  response
});

export const fetchTodos = filter => dispatch => {
  dispatch(requestTodos(filter));
  return api.fetchTodos(filter).then(response => {
    dispatch(receiveTodos(filter, response));
  });
};

const requestTodos = filter => ({
  type: 'REQUEST_TODOS',
  filter
});
//# sourceMappingURL=../action_creators.js.map