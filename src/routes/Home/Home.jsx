import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Grid } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import config from '../../config';
import FormLogin from './FormLogin';
import './Home.scss';


@inject('userStore')
@observer
class Home extends Component {
  componentDidMount() {
    const { userStore, history } = this.props;

    if (userStore.userId) {
      history.push('/profile');
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
      <div className="Home">
        <div className="top text-center">
          <h1 className="title">
            iteka<span className="first">Remote</span><span className="second">Play</span>
          </h1>
          <h2><FormattedMessage id="home.title" /></h2>
          <h4><FormattedMessage id="home.subtitle" /></h4>
          <p>
            <a
              href={config('WEBSITE_URL')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-default btn-lg callToAction"
            >
              <FormattedMessage id="home.callToAction" />
            </a>
          </p>
        </div>
        <Grid>
          <FormLogin onSubmit={this.handleSubmit} />
          <p className="help-links">
            <br />
            <a
              href={`${config('WEBSITE_URL')}/recover-password`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FormattedMessage id="login.forgotPassword" />
            </a>
            <span> | </span>
            <a
              href={`${config('WEBSITE_URL')}/signup`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FormattedMessage id="login.signup" />
            </a>
          </p>
        </Grid>
      </div>
    );
  }
}

export default Home;
