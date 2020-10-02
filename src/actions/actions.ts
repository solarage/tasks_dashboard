import {
  fetchUsersApi,
  fetchTasksApi,
  fetchCurrentTaskApi,
  createTaskApi,
  updateTaskApi,
  deleteTaskApi
} from '../api/index';

import { AppThunk } from 'types/actions/thunk';
import { IUser } from 'types/user';
import { ITask } from 'types';

export enum Type {
  SET_USERS = 'SET_USERS',
  UPDATE_USERS_FILTER_FIELD = 'UPDATE_USERS_FILTER_FIELD',
  SET_TASKS = 'SET_TASKS',
  CREATE_TASK = 'CREATE_TASK',
  UPDATE_TASK = 'UPDATE_TASK',
  DELETE_TASK = 'DELETE_TASK',
  SET_CURRENT_TASK = 'SET_CURRENT_TASK',
  UPDATE_DATE_FILTER_FIELD = 'UPDATE_DATE_FILTER_FIELD',
  SHOW_LOADER = 'SHOW_LOADER',
  FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE',
  FETCH_TASKS_FAILURE = 'FETCH_TASKS_FAILURE',
  FETCH_CURRENT_TASK_FAILURE = 'FETCH_CURRENT_TASK_FAILURE',
  CREATE_TASK_FAILURE = 'CREATE_TASK_FAILURE',
  UPDATE_TASK_FAILURE = 'UPDATE_TASK_FAILURE',
  DELETE_TASK_FAILURE = 'DELETE_TASK_FAILURE',
  SHOW_MODAL = 'SHOW_MODAL',
  CLOSE_MODAL = 'CLOSE_MODAL'
}

type modalParams = { type: string, [key: string]: unknown };
type tasksParams = { [key: string]: string };

export const fetchUsers = (): AppThunk => async (dispatch) => {
  dispatch({ type: Type.SHOW_LOADER });

  try {
    const users = await fetchUsersApi();
    dispatch({
      type: Type.SET_USERS,
      payload: { users }
    });
  } catch (error: unknown) {
    dispatch({
      type: Type.FETCH_USERS_FAILURE,
      payload: error,
      error: true
    });
  }
};

export const updateUsersFilterField = (user: IUser): AppThunk => (dispatch) => {
  dispatch({
    type: Type.UPDATE_USERS_FILTER_FIELD,
    payload: { user }
  });
};

export const fetchTasks = (params: tasksParams): AppThunk =>
async (dispatch) => {
  dispatch({ type: Type.SHOW_LOADER });

  try {
    const tasks = await fetchTasksApi(params);

    dispatch({
      type: Type.SET_TASKS,
      payload: { tasks }
    });

    return tasks;
  } catch (error: unknown) {
    dispatch({
      type: Type.FETCH_TASKS_FAILURE,
      payload: error,
      error: true
    });
  }
};

export const fetchCurrentTask = (id: string): AppThunk => async (dispatch) => {
  dispatch({ type: Type.SHOW_LOADER });

  try {
    const task = await fetchCurrentTaskApi(id);

    dispatch({
      type: Type.SET_CURRENT_TASK,
      payload: { task }
    });
  } catch (error: unknown) {
    dispatch({
      type: Type.FETCH_CURRENT_TASK_FAILURE,
      payload: error,
      error: true
    });
  }
};

export const createTask = (data): AppThunk => async (dispatch) => {
    try {
      const task = await createTaskApi(data);

      dispatch({
        type: Type.CREATE_TASK,
        payload: { task }
      });
    } catch (error: unknown) {
      dispatch({
        type: Type.CREATE_TASK_FAILURE,
        payload: error,
        error: true
      });
    }
  };

export const updateTask = (id: string, data: ITask): AppThunk =>
  async (dispatch) => {
    try {
      const task = await updateTaskApi(id, data);

      dispatch({
        type: Type.UPDATE_TASK,
        payload: { task }
      });
    } catch (error: unknown) {
      dispatch({
        type: Type.UPDATE_TASK_FAILURE,
        payload: error,
        error: true
      });
    }
  };

export const deleteTask = (id: string): AppThunk => async (dispatch) => {
  try {
    const deletedTask = await deleteTaskApi(id);

    dispatch({
      type: Type.DELETE_TASK,
      payload: { taskId: deletedTask.id }
    });
  } catch (error: unknown) {
    dispatch({
      type: Type.DELETE_TASK_FAILURE,
      payload: error,
      error: true
    });
  }
};

export const updateDateFilterField = (selectedDate:
   {[key: string]: moment.Moment}
  ): AppThunk => (dispatch) => {

    dispatch({
      type: Type.UPDATE_DATE_FILTER_FIELD,
      payload: selectedDate
    });
};

export function showModal({ type, settings }: modalParams) {
  return {
    type: Type.SHOW_MODAL,
    payload: { visibility: true, type, settings }
  };
}

export function closeModal() {
  return {
    type: Type.CLOSE_MODAL,
    payload: { visibility: false }
  };
}
