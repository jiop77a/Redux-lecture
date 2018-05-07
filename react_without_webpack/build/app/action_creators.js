/*global uuidv4*/

export const addTodo = text => ({
  type: 'ADD_TODO',
  id: uuidv4(),
  text
});

export const setVizFilter = filter => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
});

export const toggleTodo = id => ({
  type: 'TOGGLE_TODO',
  id
});
//# sourceMappingURL=../../app/action_creators.js.map