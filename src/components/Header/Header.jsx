import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Glyphicon, Image } from 'react-bootstrap';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import config from '../../config';
import avatarPlaceholder from './avatarPlaceholder.png';
import './Header.scss';

@inject('userStore')
@observer
@withRouter
class Header extends Component {
  handleNotificationClick = (e, id) => {
    e.preventDefault();

    this.props.userStore.markNotificationReaded(id)
      .then(() => this.forceUpdate());
  }

  render() {
    const { userStore, history } = this.props;


    return (
      <header className="Header">
        <Navbar inverse>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/" className="navbar-brand">
                iteka<span className="first">Remote</span><span className="second">Play</span>
              </Link>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <NavItem eventKey={1} href={`${config('WEBSITE_URL')}/catalog`} target="_blank">
              <FormattedMessage id="header.catalog" />
            </NavItem>
          </Nav>
          <Nav pullRight>
            <NavDropdown
              className={`notifications ${userStore.unreadedNotifications.length && 'has-notifications'}`}
              eventKey={6}
              title={<Glyphicon glyph="bell" />}
              id="notifications-dropdown"
            >
              {userStore.unreadedNotifications.length
                ? userStore.unreadedNotifications.map(({ _id, body }) => (
                  <li className="notification" key={_id}>
                    {body}
                    <a href="" onClick={e => this.handleNotificationClick(e, _id)}>
                      <Glyphicon glyph="ok" />
                    </a>
                  </li>
                )) : (
                  <li className="empty"><FormattedMessage id="header.emptyNotifications" /></li>
                )
              }
            </NavDropdown>
            <NavDropdown
              eventKey={6}
              title={
                <Image
                  src={userStore.user.image
                    ? `${config('CORE_API_DOMAIN')}${userStore.user.image.url}`
                    : avatarPlaceholder}
                  responsive
                />
              }
              id="user-dropdown"
            >
              <MenuItem href={`${config('WEBSITE_URL')}/profile`} target="_blank">
                <FormattedMessage id="header.profile" />
              </MenuItem>
              <MenuItem
                eventKey={6.2}
                onClick={() => {
                  userStore.logout();
                  history.push('/');
                }}
              >
                <FormattedMessage id="header.logout" />
              </MenuItem>
            </NavDropdown>
          </Nav>
        </Navbar>
      </header>
    );
  }
}

export default Header;
