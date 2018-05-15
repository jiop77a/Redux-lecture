/* global React, ReactDOM, Redux, ReactRedux, _*/

const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
          id: action.id,
          text: action.text,
          completed: false
        };
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state;
      }
      return {
        ...state,
        completed: !state.completed
      };
    default:
      return state;
  }
}

const byId = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_TODO':
    case 'TOGGLE_TODO':
      return {
        ...state,
        [action.id]: todo(state[action.id], action),
      };

    default:
      return state;
  }
}

const allIds = (state=[], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, action.id]
    default:
      return state;
  }
}

const getAllTodos = (state) => 
  state.allIds.map(id => state.byId[id])


const getVisibleTodosPrimitive = (state, filter) => {
  const allTodos = getAllTodos(state);
  switch (filter) {
    case 'all':
    return allTodos;
    case 'completed':
    return allTodos.filter(t => t.completed);
    case 'active':
    return allTodos.filter(t => !t.completed);
    default:
    throw new Error(`Unknown filter: ${filter}.`);
  }
};

const { combineReducers } = Redux;

const todos = combineReducers({byId, allIds});

// const visibilityFilter = (state = 'SHOW_ALL', action) => {
//   switch (action.type) {
//     case 'SET_VISIBILITY_FILTER':
//       return action.filter;
//     default:
//       return state;
//   }
// }
//


export const todoApp = combineReducers({
  todos
});

export const getVisibleTodos = (state, filter) =>
getVisibleTodosPrimitive(state.todos, filter)
