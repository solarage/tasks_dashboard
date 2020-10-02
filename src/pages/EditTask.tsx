import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';

import moment from 'moment';
import { handleKeyDown } from '../utils/utils';

import {
  DatePicker,
  TimePicker
} from '@material-ui/pickers';

import {
  fetchCurrentTask,
  fetchUsers,
  updateTask
} from '../actions/actions';
import { getUsers, getCurrentTask } from '../selectors';

import UserList from '../components/UserList';

import '@/styles/EditTask.scss';
import '@/styles/Pickers.scss';

import { ITask, IUser } from 'types';
import { IMatchParams } from 'types/router';
import { PUBLIC_PATH } from '../routes';

interface Props {
  match: IMatchParams,
  users: IUser[],
  task: ITask,
  fetchCurrentTask: typeof fetchCurrentTask,
  fetchUsers: typeof fetchUsers,
  updateTask: typeof updateTask
}

const EditTask: React.FunctionComponent<Props> = ({
  match,
  users,
  task,
  fetchCurrentTask,
  fetchUsers,
  updateTask
}) => {
  const { params: { id: taskId } } = match;
  const {
    name,
    assignee,
    description,
    startingDate,
    startingTime,
    dueDate,
    dueTime
  } = task;

  const history = useHistory();
  const [newStartingDate, handleStartingDateChange] = useState(moment());
  const [newStartingTime, handleStartingTimeChange] = useState(moment());
  const [newDueDate, handleDueDateChange] = useState(moment().add(1, 'day'));
  const [newDueTime, handleDueTimeChange] = useState(moment());
  const [newTaskName, setTaskName] = useState('');
  const [newDescription, setDescription] = useState('');
  const [newAssignee, setAssignee] = useState<IUser>();

  useEffect(() => {
    fetchCurrentTask(taskId);
    fetchUsers();
  }, [taskId, fetchCurrentTask]);

  useEffect(() => {
    if (!task) {
      return;
    }
    setTaskName(name);
    setDescription(description);
    setAssignee(assignee);
    handleStartingDateChange(startingDate);
    handleStartingTimeChange(startingTime);
    handleDueDateChange(dueDate);
    handleDueTimeChange(dueTime);
  }, [task]);

  function validateTask() {
    if ((!newTaskName && !newDescription)
        || (name === newTaskName
            && description === newDescription
            && assignee === newAssignee
            && startingDate === newStartingDate
            && startingTime === newStartingTime
            && dueDate === newDueDate
            && dueTime === newDueTime)
    ) {
      return false;
    }
    return true;
  }

  function handleSubmit(event:React.MouseEvent<HTMLInputElement>) {
    event.preventDefault();
    const validateInput = validateTask();

    if (!validateInput) return;

    const newTask = {
      id: taskId,
      name: newTaskName,
      assignee: newAssignee,
      startingDate: newStartingDate,
      dueDate: newDueDate,
      startingTime: newStartingTime,
      dueTime: newDueTime,
      description: newDescription
    };

    updateTask(taskId, newTask);
    history.push(PUBLIC_PATH);
  }

  return (
    <div className="container edit-page">
      <div className="header">
        <NavLink
          to={PUBLIC_PATH}
          className="nav-back-container"
        >
          <span className="nav-back-icon" />
          <span className="nav-back-text">Back To Tasks</span>
        </NavLink>
      </div>
      <div className="edit-form-container">
        <form>
          <div className="edit-form-left">
            <div className="task-name-container">
              <input
                className="task-name"
                type="text"
                value={newTaskName}
                onChange={({ target: { value } }) => setTaskName(value)}
                onKeyDown={(event) => handleKeyDown(event, handleSubmit)}
              />
            </div>

            <div className="shedule-panel">
              <div className="section-title">Shedule</div>
              <div className="shedule-fields">
                <span className="field-title">Starting Date</span>
                <span className="field-title">Starting Time</span>
                <span className="field-title">Due Date</span>
                <span className="field-title">Due Time</span>
              </div>
              <div className="shedule-controls">
                <DatePicker
                  className="date-picker"
                  value={newStartingDate}
                  onChange={handleStartingDateChange}
                />
                <TimePicker
                  className="time-picker"
                  value={newStartingTime}
                  onChange={handleStartingTimeChange}
                />
                <DatePicker
                  className="date-picker"
                  value={newDueDate}
                  onChange={handleDueDateChange}
                />
                <TimePicker
                  className="time-picker"
                  value={newDueTime}
                  onChange={handleDueTimeChange}
                />
              </div>
            </div>

            <div className="description-container">
              <div className="section-title">Details</div>
              <label htmlFor="description">Description</label>
              <textarea
                className="description"
                name="description"
                value={newDescription}
                onChange={({ target: { value } }) => setDescription(value)}
                onKeyDown={
                  (event:React.KeyboardEvent<HTMLTextAreaElement>) => 
                    handleKeyDown(event, handleSubmit)
                }
              />
            </div>
          </div>

          <div className="edit-form-right">
            <div className="section-title">Users</div>
            <UserList
              type="edit"
              users={users}
              task={task}
              selectUser={setAssignee}
            />
          </div>

          <div className="btns-container edit">
            <button
              className="save-btn"
              type="submit"
              onClick={handleSubmit}
            >
              Save
            </button>
            <button
              className="cancel-btn"
              type="submit"
              onClick={() => history.push(PUBLIC_PATH)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    task: getCurrentTask(state),
    users: getUsers(state)
  };
}

const mapDispatchToProps = {
  fetchCurrentTask,
  fetchUsers,
  updateTask
};

export default connect(mapStateToProps, mapDispatchToProps)(EditTask);
