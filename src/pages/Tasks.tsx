import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import moment from 'moment';

import {
  DatePicker
} from '@material-ui/pickers';

import {
  getTasks,
  getUsers,
  getFilteredTasks
} from '../selectors';

import {
  fetchTasks,
  fetchUsers,
  createTask,
  deleteTask,
  showModal,
  closeModal,
  updateUsersFilterField,
  updateDateFilterField
} from '../actions/actions';

import UserList from '../components/UserList';
import TaskList from '../components/TaskList';
import CreateTask from './CreateTask';

import '@/styles/Tasks.scss';

import { RootState } from 'reducers/index';
import { IUser } from 'types/user';
import { ITask } from 'types/task';

interface Props extends RouteComponentProps {
  users: IUser[],
  tasks: ITask[],
  fetchUsers: typeof fetchUsers,
  fetchTasks: typeof fetchTasks,
  showModal: typeof showModal,
  deleteTask: typeof deleteTask,
  filteredTasks: ITask[],
  updateUsersFilterField: typeof updateUsersFilterField,
  updateDateFilterField: typeof updateDateFilterField
}
const Tasks: React.FunctionComponent<Props> = ({
  users,
  tasks,
  fetchUsers,
  fetchTasks,
  showModal,
  deleteTask,
  filteredTasks,
  updateUsersFilterField,
  updateDateFilterField
}) => {
  const dateFrom = moment().startOf('day');
  const dateTo = moment().endOf('day').add(1, 'day');
  const [selectedDateFrom, handleDateChangeFrom] = useState(dateFrom);
  const [selectedDateTo, handleDateChangeTo] = useState(dateTo);
  const [selectedUser, setSelectedUser] = useState();

  useEffect(() => {
    updateDateFilterField({ from: dateFrom, to: dateTo });
    fetchTasks({});
  }, [fetchTasks, updateDateFilterField]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    updateUsersFilterField(selectedUser);
  }, [selectedUser]);

  function openModal(type: string) {
    if (type === 'create') 
      showModal({
        type,
        settings: {[type]: { component: <CreateTask /> }}
      });
  }

  function filterByDate(value: moment.Moment, type: string) {
    const handleDateChange = (type === 'from')
      ? handleDateChangeFrom
      : handleDateChangeTo;

    handleDateChange(value);
    updateDateFilterField({ [type]: value });
  }

  return (
    <div className="container tasks-page">
      <div className="header">
        <div className="section-title">Tasks</div>
        <button
          className="add-btn"
          onClick={() => openModal('create')}
        >
          + Add Task
        </button>
      </div>

      <div className="filter-section">
        <UserList
          users={users}
          type="default"
          selectUser={setSelectedUser}
        />

        <div className="date-picker-container">
          <label htmlFor="date-from">Starting Date</label>
          <DatePicker
            name="date-from"
            value={selectedDateFrom}
            onChange={(value) => filterByDate(value, 'from')}
            onAccept={(date) => date.startOf('day')}
          />
        </div>
        <div className="date-picker-container">
          <label htmlFor="date-to">Due Date</label>
          <DatePicker
            name="date-to"
            value={selectedDateTo}
            onChange={(value) => filterByDate(value, 'to')}
            onAccept={(date) => date.endOf('day')}
          />
        </div>
      </div>
      {
        (tasks.length)
          ? (
            <TaskList
              tasks={filteredTasks}
              onDelete={deleteTask}
              fetchTasks={fetchTasks}
            />
          )
          : (
            <div className="loader-section">
              <div className="loader">Loading...</div>
            </div>
          )
      }
    </div>
  );
}

function mapStateToProps(state: RootState) {
  return {
    tasks: getTasks(state),
    users: getUsers(state),

    filteredTasks: getFilteredTasks(state)
  };
}

const mapDispatchToProps = {
  fetchTasks,
  fetchUsers,
  createTask,
  deleteTask,
  showModal,
  closeModal,
  updateUsersFilterField,
  updateDateFilterField
};

const connector = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default connector(Tasks);
