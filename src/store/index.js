import { createStore, combineReducers, compose } from 'redux';

import user from './user';

const reducer = combineReducers({
  user,
});

const storeKey = 'co.fuutr.admin.redux';

const persistedState = localStorage.getItem(storeKey)
  ? JSON.parse(localStorage.getItem(storeKey))
  : {};

const store = createStore(
  reducer,
  persistedState,
  compose(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()),
);

store.subscribe(() => {
  localStorage.setItem(storeKey, JSON.stringify(store.getState()));
});

export default store;
