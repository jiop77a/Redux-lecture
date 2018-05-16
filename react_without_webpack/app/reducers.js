/* global React, ReactDOM, Redux, ReactRedux, _*/
const { combineReducers } = Redux;

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
  const ids = (state=[], action) => {
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

  const isFetching = (state = false, action) => {
    if (action.filter !== filter) {
      return state;
    }
    switch (action.type) {
      case 'REQUEST_TODOS':
        return true;
      case 'RECEIVE_TODOS':
        return false;
      default:
        return state;
    }
  }

  return combineReducers({ids, isFetching})
}

const fromList = {
  getIds: (state) => state.ids,
  getIsFetching: (state) => state.isFetching
}


export const getVisibleTodos = (state, filter) => {
  const ids = fromList.getIds(state.listByFilter[filter]);
  return ids.map(id => getTodo(state.byId, id));
};


const listByFilter = combineReducers({
  all: createList('all'),
  active: createList('active'),
  completed: createList('completed'),

})

export const getIsFetching = (state, filter) =>
  fromList.getIsFetching(state.listByFilter[filter]);


export const todoApp = combineReducers({byId, listByFilter});
