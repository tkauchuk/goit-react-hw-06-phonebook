import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import types from './action-types';

const items = (state = [], { type, payload }) => {
  switch (type) {
    case types.ADD:
      return [payload, ...state];

    case types.DELETE:
      return state.filter(item => item.uid !== payload);

    default:
      return state;
  }
};

const filter = (state = '', {type, payload}) => {
  switch (type) {
    case types.FILTER:
      return payload
    default:
      return state;
  }
};

const persistConfig = {
  key: 'savedItems',
  storage,
  blacklist: ['filter']
};

const reducer = combineReducers({items, filter});

const root = combineReducers({
  contacts: persistReducer(persistConfig, reducer)
});

const store = createStore(root, composeWithDevTools());
const persistor = persistStore(store);

export default { store, persistor };

