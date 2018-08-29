import React, { Fragment } from 'react';
import createHistory from 'history/createBrowserHistory';
import { Router, Route, Switch } from 'react-router-dom';
import { WrapperDefaultLayout, PrivateRoute } from '../components';
import Home from './Home';
// errors
import NotFound from './NotFound';
import NotAuthorized from './NotAuthorized';
// authorized
import Profile from './Profile';


const history = createHistory();

const Wrapped = {
  Home: WrapperDefaultLayout(Home),
  // errors
  NotFound: WrapperDefaultLayout(NotFound),
  NotAuthorized: WrapperDefaultLayout(NotAuthorized),
  // authorized
  Profile: WrapperDefaultLayout(Profile),
};

export default () => (
  <Router history={history}>
    <Fragment>
      <Switch>
        <Route path="/" exact component={Wrapped.Home} />

        {/* authorized */}
        <PrivateRoute path="/profile" exact component={Wrapped.Profile} />

        {/* errors */}
        <Route path="/not-authorized" component={Wrapped.NotAuthorized} />
        <Route path="/*" component={Wrapped.Home} />
      </Switch>
    </Fragment>
  </Router>
);
