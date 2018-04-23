/* global Redux, React, ReactDOM */

const counter = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
};

const createStore = (reducer) => {
  let state;
  let listeners = [];

  const getState = () => state;
  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach((listener) => listener());
  };

  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  };

  dispatch({});

  return { getState, dispatch, subscribe };
};

const onIncrement = () => {
  store.dispatch({type: 'INCREMENT'});
};

const onDecrement = () => {
  store.dispatch({type: 'DECREMENT'});
};

const Counter = ({ value }) => (
  React.createElement('div', null,
    React.createElement('h1', null, value),
    React.createElement('button', {onClick: onIncrement}, '+' ),
    React.createElement('button', {onClick: onDecrement}, '-' )
  )
);

const store = createStore(counter);

const render = () => {
  ReactDOM.render(
    React.createElement(Counter, {value: store.getState()}),
    document.getElementById('root')
  );
};

store.subscribe(render);
render();




// expect(
//   counter(0, { type: 'INCREMENT' })
// ).toEqual(1);
//
// expect(
//   counter(1, { type: 'INCREMENT' })
// ).toEqual(2);
//
// expect(
//   counter(2, { type: 'DECREMENT' })
// ).toEqual(1);
//
// expect(
//   counter(1, { type: 'DECREMENT' })
// ).toEqual(0);
//
// expect(
//   counter(1, { type: 'SOMETHING_ELSE' })
// ).toEqual(1);
//
// expect(
//   counter(undefined, {})
// ).toEqual(0);
//
// console.log('Tests passed!');
