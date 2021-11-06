import {v4 as uuidv4} from 'uuid';
import types from './action-types';

const addUsersContact = user => ({
  type: types.ADD,
  payload: {
    uid: uuidv4(),
    ...user
  }
});

const deleteUsersContact = id => ({
  type: types.DELETE,
  payload: id
});

const changeContactsFilter = value => ({
  type: types.FILTER,
  payload: value
});

const actions = { addUsersContact, deleteUsersContact, changeContactsFilter }

export default actions;
