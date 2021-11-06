import { combineReducers } from 'redux';
import { createReducer, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import actions from './action-creators';

const items = createReducer([],{
  [actions.addUsersContact]: (state, {payload}) => [payload, ...state],
  [actions.deleteUsersContact]: (state, {payload}) => state.filter(({uid}) => uid !== payload)
});
const filter = createReducer('', {
  [actions.changeContactsFilter]: (_, {payload}) => payload
});

const reducer = combineReducers({items, filter});

const persistConfig = {
  key: 'savedItems',
  storage,
  blacklist: ['filter']
};

const store = configureStore({
  reducer: {
    contacts: persistReducer(persistConfig, reducer)
  },
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    }
  })],
  devTools: process.env.NODE_ENV === 'development'
});
const persistor = persistStore(store);

const storeObj = {store, persistor};

export default storeObj;

