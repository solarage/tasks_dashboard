import { combineReducers } from 'redux';

import users from './users';
import tasks from './tasks';
import modal from './modal';

const rootReducer = combineReducers({
  users: users,
  tasks: tasks,
  modal: modal
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>
