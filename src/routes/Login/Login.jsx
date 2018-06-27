import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Grid } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import FormLogin from './FormLogin';

@inject('userStore')
@observer
class Login extends Component {
  componentDidMount() {
    const { userStore } = this.props;

    if (userStore.userId) {
      userStore.logout();
    }
  }

  handleSubmit = ({ identifier, password }) => {
    const { userStore: { login }, history } = this.props;

    return login({ identifier, password })
      .then(() => history.push('/profile'))
      .catch(({ data: { message: error } }) => Promise.reject(error));
  }

  render() {
    return (
      <div className="Login">
        <Grid>
          <h2><FormattedMessage id="login.title" /></h2>
          <FormLogin onSubmit={this.handleSubmit} />
          <p>
            <br />
            <Link to="/recover-password">
              <FormattedMessage id="login.forgotPassword" />
            </Link>
            <span> | </span>
            <Link to="/signup">
              <FormattedMessage id="login.signup" />
            </Link>
          </p>
        </Grid>
      </div>
    );
  }
}

export default Login;
