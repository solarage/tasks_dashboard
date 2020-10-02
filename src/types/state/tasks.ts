import { ITask } from '../task';

export interface ITasks {
  tasks: ITask[],
  currentTask: ITask,
  selectedDate: {
    from: string,
    to: string
  },
  search: ITask[]
}
