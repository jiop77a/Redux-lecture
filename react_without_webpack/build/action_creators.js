/*global uuidv4, Promise*/
import * as api from './fakeDatabase.js';
import { getIsFetching } from './reducers.js';

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

// export const fetchTodos = (filter) => (dispatch, getState) => {
//   if (getIsFetching(getState(), filter)) {
//     return Promise.resolve();
//   }
//
//   dispatch(requestTodos(filter));
//   return api.fetchTodos(filter).then(response => {
//     dispatch(receiveTodos(filter, response));
//   });
// };

export const fetchTodos = filter => async (dispatch, getState) => {
  if (getIsFetching(getState(), filter)) {
    return;
  }

  dispatch({
    type: 'FETCH_TODOS_REQUEST',
    filter
  });

  try {
    let response = await api.fetchTodos(filter);
    dispatch({
      type: 'FETCH_TODOS_SUCCESS',
      filter,
      response
    });
  } catch (error) {
    dispatch({
      type: 'FETCH_TODOS_FAILURE',
      filter,
      message: error.message || 'Something went wrong.'
    });
  }
};
//# sourceMappingURL=../action_creators.js.map