import React, { Component, Fragment } from 'react';
import { observer, inject } from 'mobx-react';
import { Grid, Row, Col, Button, ListGroup, ListGroupItem, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { FormattedMessage, injectIntl } from 'react-intl';
import moment from 'moment';
import { Loader, Header } from '../../components';
import { getFingerprint } from '../../utils';
import config from '../../config';
import './Profile.scss';

@injectIntl
@inject('userStore', 'paymentTypeStore', 'consoleGroupStore')
@observer
class Profile extends Component {
  state = {
    activeSubscription: {},
    consoleGroupObj: {},
    paymentTypeObj: {},
  }

  componentDidMount() {
    const { userStore, consoleGroupStore, paymentTypeStore, history } = this.props;

    userStore.getUser()
      .then(({ subscriptions }) => {
        this.setState({ activeSubscription: subscriptions.find(({ active }) => active) });
        return this.state.activeSubscription;
      })
      .then(({ consoleGroup, payment }) => {
        const { paymentType } = userStore.user.payments.find(({ id }) => id === payment);

        paymentTypeStore.getPaymentTypeDetails(paymentType)
          .then(paymentTypeObj => {
            this.setState({ paymentTypeObj });
            return paymentTypeObj;
          });

        consoleGroupStore.getConsoleGroupDetails(consoleGroup)
          .then(consoleGroupObj => {
            this.setState({ consoleGroupObj });
            return consoleGroupObj;
          });
        return null;
      })
      .then(() => getFingerprint(hash => userStore.checkDemoHistory(hash)))
      .catch(err => (err.status === 401 ? history.push('/') : null));
  }

  handlePlay = str => {
    if (str === 'Demo') {
      getFingerprint(hash => this.props.userStore.createDemoHistory(hash));
    }

    window.play(str);
  }

  renderGenreTooltip= text => (
    <Tooltip id="genre-tooltip">{text}</Tooltip>
  );

  render() {
    const { userStore, consoleGroupStore, paymentTypeStore, intl } = this.props;

    if (userStore.isLoading || consoleGroupStore.isLoading || paymentTypeStore.isLoading) {
      return <Loader />;
    }

    const { activeSubscription, consoleGroupObj, paymentTypeObj } = this.state;

    return (
      <div className="Profile">
        <Header />
        <Grid>
          {activeSubscription ? (
            <div>
              <h3>
                <FormattedMessage
                  id="profile.activeSubscription"
                  values={{
                    paymentType: paymentTypeObj.name,
                    consoleGroup: consoleGroupObj.name,
                  }}
                />
              </h3>
              <div className="date">
                <OverlayTrigger
                  placement="right"
                  overlay={this.renderGenreTooltip(intl.formatMessage({
                    id: 'profile.till',
                  }, {
                    end: moment(activeSubscription.end_date).format('llll'),
                  }))}
                >
                  <span>
                    <FormattedMessage
                      id="profile.subscriptionLeft"
                      values={{
                        left: moment(activeSubscription.end_date).from(moment()).replace('in ', ''),
                      }}
                    />
                  </span>
                </OverlayTrigger>
              </div>
              <div className="links">
                <a
                  href={`${config('WEBSITE_URL')}/profile`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-default"
                >
                  <FormattedMessage id="profile.renewSubscription" />
                </a>
              </div>
              <Row>
                <Col sm={6}>
                  <div className="details">
                    <h4><FormattedMessage id="profile.subscriptionDetails" /></h4>
                    <p>{consoleGroupObj.description}</p>
                    <p>{paymentTypeObj.description}</p>
                  </div>
                </Col>
                <Col sm={6}>
                  <div className="games">
                    <h4><FormattedMessage id="profile.gamesAvalaible" /></h4>
                    <ListGroup>
                      {consoleGroupObj.games && consoleGroupObj.games.map(game => (
                        <ListGroupItem key={game.id}>
                          <a
                            href={`${config('WEBSITE_URL')}/games/${game.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {game.name}
                          </a>
                        </ListGroupItem>
                      ))}
                    </ListGroup>
                  </div>
                </Col>
              </Row>
            </div>
          ) : (
            <Fragment>
              <h3><FormattedMessage id="profile.noSubscription" /></h3>
              <div className="links">
                <a
                  href={`${config('WEBSITE_URL')}/catalog}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-default"
                >
                  <FormattedMessage id="profile.noSubscriptionLink" />
                </a>
              </div>
              <p><br /><FormattedMessage id="profile.noSubscriptionDescription" /></p>
            </Fragment>
          )}
        </Grid>
        <div className="profile-footer">
          <Grid>
            {userStore.demoAvailable && (
              <Button
                bsSize="large"
                bsStyle="warning"
                onClick={() => this.handlePlay('Demo')}
              >
                <FormattedMessage id="profile.playDemo" />
              </Button>
            )}
            <Button
              bsSize="large"
              bsStyle="success"
              disabled={!activeSubscription}
              onClick={() => this.handlePlay('Play')}
            >
              <FormattedMessage id="profile.play" />
            </Button>
          </Grid>
        </div>
      </div>
    );
  }
}

export default Profile;
