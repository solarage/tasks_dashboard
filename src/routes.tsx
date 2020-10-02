import React from 'react';
import { 
  Switch,
  Route,
  withRouter,
  RouteComponentProps
} from 'react-router-dom';

import Tasks from './pages/Tasks';
import EditTask from './pages/EditTask';

export const PUBLIC_PATH = process.env.REACT_APP_PUBLIC_PATH || '/';

const Routes: React.FunctionComponent<RouteComponentProps> = () => (
  <Switch>
    <Route
      path={PUBLIC_PATH}
      exact
      component={Tasks}
    />
    <Route
      path="/tasks/:id"
      component={EditTask}
    />
  </Switch>
);

export default withRouter(Routes)
