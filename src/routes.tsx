import React from 'react';
import { 
  Switch,
  Route,
  withRouter,
  RouteComponentProps
} from 'react-router-dom';

import Tasks from './pages/Tasks';
import EditTask from './pages/EditTask';

const Routes: React.FunctionComponent<RouteComponentProps> = () => (
  <Switch>
    <Route path="/" exact component={Tasks} />
    <Route
      path="/tasks/:id"
      component={EditTask}
    />
  </Switch>
);

export default withRouter(Routes)
