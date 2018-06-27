import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Image, Badge, Tooltip, OverlayTrigger } from 'react-bootstrap';
// import { FormattedMessage } from 'react-intl';
import config from '../../config';
import './CatalogCard.scss';


@withRouter
class CatalogCard extends Component {
  handleClick = () => {
    const { id, paymentTypeId, history } = this.props;

    if (!paymentTypeId) {
      return history.push(`/pay/${id}`);
    }

    // eslint-disable-next-line no-console
    console.log(`Pay for console ${id} with paymentTypeId ${paymentTypeId}`);
    return null;
  }

  renderGenreTooltip= text => (
    <Tooltip id="genre-tooltip">{text}</Tooltip>
  );

  render() {
    const { type, name, available, images, id, paymentTypeId, genres } = this.props;

    return (
      <div className={`CatalogCard ${available || 'not-available'}`}>
        <Link to={`/${type}/${id}${paymentTypeId ? `/${paymentTypeId}` : '/'}`} className="Link">
          {images[0] && <Image src={`${config('CORE_API_DOMAIN')}${images[0].url}`} responsive />}
          <div className="info-bar">
            <div className="info">{name}</div>
            {genres && (
              <div className="genres">
                {genres.map(({ name, description, id }) => (
                  <OverlayTrigger key={id} placement="bottom" overlay={this.renderGenreTooltip(description)}>
                    <Badge>{name}</Badge>
                  </OverlayTrigger>
                ))}
              </div>
            )}
            {/* {type === 'consoles' && (
              <div className="buy">
                <Button onClick={this.handleClick} disabled={!available} bsSize="xsmall">
                  <FormattedMessage id="catalog.buyButton" />
                </Button>
              </div>
            )} */}
          </div>
        </Link>
      </div>
    );
  }
}

export default CatalogCard;
