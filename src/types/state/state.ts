import { IUsers } from './users';
import { ITasks } from './tasks';
import { IModal } from './modal';

export interface IRootReducer {
  users: IUsers,
  tasks: ITasks,
  modal: IModal
}
