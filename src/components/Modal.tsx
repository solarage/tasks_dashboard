import React from 'react';
import { connect } from 'react-redux';

import {
  closeModal
} from '../actions/actions';

import {
  getComponent,
  getVisibility,
  getModalType,
  getModalSettings
} from '../selectors';

import '@/styles/Modal.scss';

interface Props {
  component: () => unknown,
  visibility: boolean,
  closeModal: typeof closeModal,
  type: string,
  settings: { [key: string]: { [key: string]: unknown } }
}

const Modal: React.FunctionComponent<Props> = ({
  component, visibility, closeModal, type, settings
}) => {
  const title = settings[type].title;
  const message = settings[type].title;

  return (visibility && (
    <div className="modal">
      <div className="wrapper">
        <div className={`container ${type}`}>
          <button
            onClick={closeModal}
            className="close_btn"
            type="button"
          />

          <div className="title">{title}</div>
          <div className="message">{message}</div>

          { component }

        </div>

        <div onClick={closeModal} className="backdrop" />
      </div>
    </div>
  ));
}

function mapStateToProps(state) {
  return {
    component: getComponent(state),
    visibility: getVisibility(state),
    type: getModalType(state),
    settings: getModalSettings(state)
  };
}

const mapDispatchToProps = {
  closeModal
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
