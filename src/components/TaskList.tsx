import React, { useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { History, LocationState } from 'history';

import { fetchTasks } from 'actions/actions';

import Task from './Task';

import '@/styles/TaskList.scss';

import { ITask } from 'types';

interface Props extends RouteComponentProps {
  tasks: ITask[],
  onDelete: (id: string) => void;
  fetchTasks: typeof fetchTasks,
  history: History<LocationState>
}

const TaskList: React.FunctionComponent<Props> = ({
  tasks,
  onDelete,
  fetchTasks,
  history,
  location,
  match
}) => {
  const tableHeaders = ['Task Name', 'Assignee', 'Starts At', 'Due At'];
  const isDueDate = (name) => name === 'Due At';
  const [sortOrder, setSortOrder] = useState('desc');
  const calcClass = (field) => (isDueDate(field) ? sortOrder : '');

  function sortByField(field: string) {
    if (!isDueDate(field)) return;

    const order = sortOrder === 'desc' ? 'asc' : 'desc';
    const params = { 'sortBy': field, order };

    if (isDueDate(field)) params.sortBy = 'dueDate';

    setSortOrder(order);
    fetchTasks(params);
  }

  return (
    <div className="container table-container">
      <div className="table-header">
        {tableHeaders.map((header) => (
          <div
            key={header}
            onClick={() => sortByField(header)}
            className={`${header} ${calcClass(header)} header-cell`}
          >
            {header}
          </div>
        ))}
      </div>
      <div className="table-body">
        {
          tasks.map(
            (task) =>
              <Task
                key={task.id}
                task={task}
                type="list"
                onDelete={onDelete}
                history={history}
                location={location}
                match={match}
              />
          )
        }
      </div>
    </div>
  );
};

export default withRouter(TaskList);
