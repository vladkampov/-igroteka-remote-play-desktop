import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Route, Redirect } from 'react-router';

@inject('userStore')
@observer
class PrivateRoute extends Component {
  componentDidMount() {
    this.props.userStore.getUser();
  }

  render() {
    const { component: Component, userStore, ...rest } = this.props;

    return (
      <Route
        {...rest}
        render={props => (
          userStore.user
            ? <Component {...props} />
            : <Redirect to="/login" />
        )}
      />
    );
  }
}

export default PrivateRoute;
