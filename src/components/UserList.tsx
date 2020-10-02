import React from 'react';

import { getFullName } from '../utils/utils';

import '@/styles/UserList.scss';

import { ANY, ITask, IUser } from 'types';

interface Props {
  users: IUser[],
  task?: ITask,
  selectUser: React.Dispatch<React.SetStateAction<IUser>>,
  type: string
}

const UserList: React.FunctionComponent<Props> = ({
  users, task, selectUser, type
}) => {
  const { assignee } = task || {};
  const currentUserId = assignee && assignee.id;
  const defaultValue = 'No assignee selected';
  const usersCopy = [...users];

  usersCopy.unshift({} as ANY);

  const assigneesOptions = usersCopy.map((user) => {
    getFullName(user);
    const { id: userId } = user;
    const selected = currentUserId === userId;
    const fullName = getFullName(user);

    return (
      <option
        key={userId}
        value={userId || defaultValue}
        selected={selected}
      >
        {fullName || defaultValue}
      </option>
    );
  });

  function defineAssignee(id) {
    return users.find((user) => user.id === id);
  }

  function handleChange(id) {
    const user = defineAssignee(id);

    selectUser(user);
  }

  return (
    <div className={`container user-list ${type}`}>
      <label htmlFor="users">Assignee</label>
      <select
        id="users"
        name="users"
        onChange={({ target: { value } }) => handleChange(value)}
      >
        {assigneesOptions}
      </select>
    </div>
  );
};

export default UserList;
