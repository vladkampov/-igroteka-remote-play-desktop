import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Carousel } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { Loader } from '../';
import config from '../../config';
import './Slider.scss';


@withRouter
@inject('sliderItemStore')
@observer
class Slider extends Component {
  componentDidMount() {
    this.props.sliderItemStore.getSliderItems();
  }

  handleSlideClick = (id, type) => {
    this.props.history.push(`/${type}/${id}`);
  }

  render() {
    const { sliderItemStore: { instances, isLoading } } = this.props;

    if (isLoading) {
      return <Loader />;
    }

    return (
      <div className="Slider">
        <Carousel>
          {instances.map(({ id, title, description, image, consolegroup, game }) => (
            <Carousel.Item
              key={id}
              onClick={() => this.handleSlideClick(
                consolegroup ? consolegroup.id : game.id,
                consolegroup ? 'consoles' : 'games'
              )}
            >
              <img alt="" src={`${config('CORE_API_DOMAIN')}${image.url}`} />
              <Carousel.Caption>
                <h3>{title}</h3>
                <p>{description}</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    );
  }
}

export default Slider;

