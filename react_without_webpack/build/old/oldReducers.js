// const todo = (state, action) => {
//   switch (action.type) {
//     case 'ADD_TODO':
//       return {
//           id: action.id,
//           text: action.text,
//           completed: false
//         };
//     case 'TOGGLE_TODO':
//       if (state.id !== action.id) {
//         return state;
//       }
//       return {
//         ...state,
//         completed: !state.completed
//       };
//     default:
//       return state;
//   }
// }

// const visibilityFilter = (state = 'SHOW_ALL', action) => {
//   switch (action.type) {
//     case 'SET_VISIBILITY_FILTER':
//       return action.filter;
//     default:
//       return state;
//   }
// }
//

//
// export const todoApp = combineReducers({
//   todos
// });

// export const getVisibleTodos = (state, filter) =>
// getVisibleTodosPrimitive(state.todos, filter)
//# sourceMappingURL=../../old/oldReducers.js.map