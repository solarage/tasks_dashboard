import React, { useState } from 'react';
import { connect } from 'react-redux';

import moment from 'moment';
import { handleKeyDown } from '../utils/utils';

import {
  createTask, closeModal
} from '../actions/actions';

import '@/styles/CreateTask.scss';

interface Props {
  createTask: typeof createTask,
  closeModal: typeof closeModal
}

const CreateTask: React.FunctionComponent<Props> = ({
  createTask,
  closeModal
}) => {
  const [taskName, setTaskName] = useState('');

  function handleSubmit(event:React.MouseEvent<HTMLInputElement>) {
    event.preventDefault();

    if (!taskName) return;

    const now = moment();
    const newTask = {
      id: now,
      name: taskName,
      assignee: {},
      startingDate: moment(),
      dueDate: moment().add(1, 'day'),
      startingTime: moment(),
      dueTime: moment(),
      description: ''
    };

    createTask(newTask);
    closeModal();
  }

  return (
    <div className="create-form-container">
      <form>
        <div className="create-form">
          <div className="section-title">Create a new task</div>
          <div className="task-name-container">
            <label htmlFor="task-name">Task Name</label>
            <input
              name="task-name"
              className="task-name"
              type="text"
              onChange={({ target: { value } }) => setTaskName(value)}
              onKeyDown={(event) => handleKeyDown(event, handleSubmit)}
            />
          </div>
          <div className="btns-container create">
            <button
              className="create-btn"
              type="submit"
              onClick={handleSubmit}
            >
              Create Task
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

function mapStateToProps() {
  return {};
}

const mapDispatchToProps = {
  createTask,
  closeModal
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateTask);
