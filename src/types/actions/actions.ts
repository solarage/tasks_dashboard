import { Type } from 'actions/actions';
import { ITask } from 'types/task';
import { IUser } from '../user';

interface FetchUsers {
  type: Type.SET_USERS,
  payload: { users: IUser[] }
}

interface UpdateUsersFilterField {
  type: Type.UPDATE_USERS_FILTER_FIELD,
  payload: { user: IUser }
}

interface FetchTasks {
  type: Type.SET_TASKS,
  payload: { tasks: ITask[] }
}

interface FetchCurrentTask {
  type: Type.SET_CURRENT_TASK,
  payload: { task: ITask }
}

interface CreateTask {
  type: Type.CREATE_TASK,
  payload: { task: ITask }
}

interface UpdateTask {
  type: Type.UPDATE_TASK,
  payload: { task: ITask }
}

interface DeleteTask {
  type: Type.DELETE_TASK,
  payload: { taskId: string }
}

interface UpdateDateFilterField {
  type: Type.UPDATE_DATE_FILTER_FIELD,
  payload: { [key: string]: any }
}

interface ShowModal {
  type: Type.SHOW_MODAL,
  payload: { 
    visibility: boolean,
    type: string,
    settings?: {[key: string]: unknown} 
  }
}

interface CloseModal {
  type: Type.CLOSE_MODAL,
  payload: { visibility: boolean }
}

export type ActionTypes = FetchUsers | UpdateUsersFilterField | FetchTasks | 
  FetchCurrentTask | CreateTask | UpdateTask | DeleteTask | 
  UpdateDateFilterField | ShowModal | CloseModal