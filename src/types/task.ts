import * as moment from 'moment';
import { IUser } from './user';

export interface Task<T, U> {
  readonly id: string,
  name: string,
  assignee: U,
  startingDate: T,
  dueDate: T,
  startingTime: T,
  dueTime: T,
  description: string
}

export interface ITask2<T> {
  readonly id: string,
  name: string,
  assignee: T,
  startingDate: moment.Moment,
  dueDate: moment.Moment,
  startingTime: moment.Moment,
  dueTime: moment.Moment,
  description: string
}

export type ITask = Task<moment.Moment, IUser>
export type ITaskWithStringDate = Task<string, IUser> |
  Task<moment.Moment, IUser>
export type ITaskWithStringAssignee = Task<moment.Moment, string> |
  Task<moment.Moment, IUser>