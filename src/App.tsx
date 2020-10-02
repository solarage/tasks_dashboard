import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';

import Routes from './routes';

import { fetchTasks } from './actions/actions';

import Search from './components/Search';
import Modal from './components/Modal';

import './styles/main.scss';

interface Props {
  fetchTasks: typeof fetchTasks
}

const App: React.FunctionComponent<Props> = ({ fetchTasks }) => {
  return (
    <Router>
      <Modal />

      <div className="main-wrapper">
        <header>
          <Search onSearch={fetchTasks} />
          <div className="ui-panel" />
        </header>
        <aside>
          <div className="logo-container">
            <div className="logo" />
          </div>

          <div className="ui-panel rotate" />
          <div className="ui-panel rotate middle" />
          <div className="ui-panel rotate bottom" />
          <div className="ui-oval" />
        </aside>

        <Routes />
      </div>
    </Router>
  );
}

const mapDispatchToProps = { fetchTasks };

export default connect(null, mapDispatchToProps)(App);
