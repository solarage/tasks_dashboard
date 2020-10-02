import { ActionTypes } from 'types/actions/actions';
import { Type } from '../actions/actions'

const initialState = {
  visibility: false,
  type: '',
  settings: {
    create: {
      title: 'Create a new task',
      message: '',
      component: {}
    },
    discard: {
      title: 'Discard unsaved changes',
      message: ''
    },
    delete: {
      title: 'Are you sure you want to delete?',
      message: ''
    },
    search: {
      title: 'Result',
      message: 'Tasks containing '
    }
  }
};

const modal = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    case Type.SHOW_MODAL:
      return {
        ...state,
        visibility: action.payload.visibility,
        type: action.payload.type,
        settings: { ...state.settings, ...action.payload.settings }
      };
    case Type.CLOSE_MODAL:
      return {
        ...state,
        visibility: action.payload.visibility
      };

    default:
      return state;
  }
};

export default modal;
