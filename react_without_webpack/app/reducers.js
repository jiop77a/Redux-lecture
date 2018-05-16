/* global React, ReactDOM, Redux, ReactRedux, _*/

const byId = (state = {}, action) => {
  switch (action.type) {
    case 'RECEIVE_TODOS':
      const nextState = { ...state };
      action.response.forEach(todo => {
        nextState[todo.id] = todo
      });
      return nextState;
    default:
      return state;
  }
}

const getTodo = (state, id) => state[id];

const createList = (filter) => {
  return (state=[], action) => {
    if (action.filter !== filter) {
      return state;
    }
    switch (action.type) {
      case 'RECEIVE_TODOS':
        return action.response.map(todo => todo.id);
      default:
        return state;
    }
  }
}

const getIds = (state) => state;


export const getVisibleTodos = (state, filter) => {
  const ids = getIds(state.listByFilter[filter]);
  return ids.map(id => getTodo(state.byId, id));
};

const { combineReducers } = Redux;

const listByFilter = combineReducers({
  all: createList('all'),
  active: createList('active'),
  completed: createList('completed'),

})

export const todoApp = combineReducers({byId, listByFilter});
