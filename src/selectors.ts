import moment from 'moment';
import { createSelector } from 'reselect';

import { RootState } from 'reducers/index';
import { ITask, IUser } from 'types';

export const getUsers = (state: RootState) => state.users.users;

export const getTasks = (state: RootState) => state.tasks.tasks;

export const getCurrentTask = (state: RootState) => state.tasks.currentTask;

export const getVisibility = (state: RootState) => state.modal.visibility;

export const getComponent = (state: RootState) => (
  state.modal.settings.create.component
);

export const getModalType = (state: RootState) => {
  return state.modal.type || 'create';
};

export const getModalSettings = (state: RootState) => state.modal.settings;

export const getSelectedUser = (state: RootState) => state.users.selectedUser;

export const getSelectedUserId = (state: RootState) => {
  return state.users.selectedUser.id;
};

export const getDateFilterFieldFrom = (state: RootState) => (
  state.tasks.selectedDate.from
);

export const getDateFilterFieldTo = (state: RootState) => (
  state.tasks.selectedDate.to
);

export const getUsersHash = createSelector(
  [getUsers, getTasks],
  (users: IUser[], tasks: ITask[]) => {
    const userHash = {};

    users.map((user) => {
      const taskList = [];
      const userId = user.id;

      tasks.filter((task) => {
        if (task.assignee.id === userId) taskList.push(task);
      });

      userHash[userId] = taskList;
    });

    return userHash;
  }
);

export const getFilteredTasksByUser = createSelector(
  [getUsersHash, getTasks, getSelectedUserId],
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  (usersHash, tasks, selectedUserId) => usersHash[selectedUserId] || tasks
);

export const getFilteredTasks = createSelector(
  [getFilteredTasksByUser, getDateFilterFieldFrom, getDateFilterFieldTo],
  (filteredTasksByUser: ITask[], from, to) => filteredTasksByUser.filter(
    (item) => {
      const msFrom = moment(from).valueOf();
      const msTo = moment(to).valueOf();
      const startingDate = moment(item.startingDate).valueOf();
      const dueDate = moment(item.dueDate).valueOf();

      if (msFrom <= startingDate && dueDate <= msTo) return item;
    }
  )
);
