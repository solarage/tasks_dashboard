import { ActionTypes } from 'types/actions/actions';
import { ITask } from 'types/task';
import { Type } from '../actions/actions'

const initialState = {
  tasks: [] as ITask[],
  currentTask: {} as ITask,
  selectedDate: {
    from: '',
    to: ''
  },
  search: [] as ITask[]
};

const tasks = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    case Type.SET_TASKS:
      return {
        ...state,
        tasks: [...action.payload.tasks]
      };
    case Type.SET_CURRENT_TASK:
      return {
        ...state,
        currentTask: action.payload.task
      };
    case Type.CREATE_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload.task]
      };
    case Type.UPDATE_TASK:
      return {
        ...state,
        currentTask: {},
        tasks: state.tasks.map((task) => (task.id === action.payload.task.id
          ? { ...task, ...action.payload.task }
          : task))
      };
    case Type.DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload.taskId)
      };
    case Type.UPDATE_DATE_FILTER_FIELD:
      return {
        ...state,
        selectedDate: { ...state.selectedDate, ...action.payload }
      };

    default:
      return state;
  }
};

export default tasks;
