import { IUser } from 'types/user';
import { Type } from '../actions/actions'
import { ActionTypes } from 'types/actions/actions';

const initialState = {
  users: [] as IUser[],
  selectedUser: {} as IUser
};

const users = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    case Type.SET_USERS:
      return {
        ...state,
        users: [...action.payload.users]
      };

    case Type.UPDATE_USERS_FILTER_FIELD:
      return {
        ...state,
        selectedUser: { ...action.payload.user }
      };

    default:
      return state;
  }
};

export default users;
