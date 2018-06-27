import React, { Component } from 'react';
import { inject } from 'mobx-react';
import { Navbar, Nav, NavItem, FormGroup, FormControl } from 'react-bootstrap';
import { FormattedMessage, injectIntl } from 'react-intl';
import { LinkContainer } from 'react-router-bootstrap';
import './Submenu.scss';


@injectIntl
@inject('gameStore', 'consoleStore')
class Submenu extends Component {
  onSearch = ({ target: { value } }) => {
    const { gameStore, consoleStore, listType } = this.props;

    const { setFilter } = listType === 'games' ? gameStore : consoleStore;
    setFilter(value);
  }

  render() {
    const { intl } = this.props;
    return (
      <div className="Submenu">
        <Navbar inverse>
          <Nav>
            <LinkContainer to="/catalog/consoles">
              <NavItem eventKey={7}><FormattedMessage id="submenu.consoles" /></NavItem>
            </LinkContainer>
            <LinkContainer to="/catalog/games">
              <NavItem eventKey={8}><FormattedMessage id="submenu.games" /></NavItem>
            </LinkContainer>
            <NavItem eventKey={9} href="#" className="btn-demo">
              <FormattedMessage id="submenu.demo" />
            </NavItem>
          </Nav>
          <Navbar.Form pullRight>
            <FormGroup>
              <FormControl
                type="text"
                placeholder={intl.formatMessage({ id: 'submenu.search' })}
                onChange={this.onSearch}
              />
            </FormGroup>
          </Navbar.Form>
        </Navbar>
      </div>
    );
  }
}

export default Submenu;
