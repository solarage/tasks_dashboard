import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { History, LocationState } from 'history';

import { getFullName, getReadableDate, getReadableTime } from '../utils/utils';

import '@/styles/Task.scss';

import { ANY, ITask } from 'types';

interface Props extends RouteComponentProps {
  task: ITask,
  type: string,
  onDelete: (id: string) => void,
  history: History<LocationState>
}

const Task: React.FunctionComponent<Props> = ({
  history, task, type, onDelete 
}) => {
  const { id } = task;

  function openEditPage(id: string) {
    history.push(`/tasks/${id}`);
  }

  function transformDate(obj: {[key: string]: ANY }) {
    const resObj = { ...obj };
    const {
      startingDate, dueDate, startingTime, dueTime
    } = obj;

    resObj.startingDate = `${getReadableDate(startingDate)} -
      ${getReadableTime(startingTime)}`;
    resObj.dueDate = `${getReadableDate(dueDate)} - 
      ${getReadableTime(dueTime)}`;

    return resObj;
  }

  function transformName(obj: {[key: string]: ANY }) {
    const resObj = { ...obj };
    const { assignee } = obj;

    resObj.assignee = getFullName(assignee);

    return resObj;
  }

  function renderCells(currentTask: ITask) {
    const taskCopy = { ...currentTask };
    const taskObj = transformDate(transformName(taskCopy));
    const taskKeys = Object.keys(taskObj);
    let id: string;

    taskKeys.map((key) => {
      if (key === 'id') id === taskObj[key];
    });

    return (
      <div className={`${type} body-row`}>
        {
          Object.values(taskObj).map(
            (value, i) => 
              <div
                key={id} className={`${taskKeys[i]} body-cell`}>{value}</div>
            )
          }
      </div>
    );
  }

  return (
    <div className="task-container">
      { type === 'list' && renderCells(task)}

      <div className="btns-container">
        <button
          className="edit-btn"
          onClick={() => openEditPage(id)}
        />
        <button
          className="delete-btn"
          onClick={() => onDelete(id)}
        />
      </div>
    </div>
  );
};

export default Task;
