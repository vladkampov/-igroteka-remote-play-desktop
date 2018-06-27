import { getSliderItems, getSliderItem } from '../api/sliderItems';
import { DomainInstanceStore, DomainInstance } from './domainInstanceStore';


export class SliderItemStore extends DomainInstanceStore {
  constructor() {
    super(SliderItem, getSliderItems, getSliderItem); // eslint-disable-line no-this-before-super
  }

  getSliderItems() {
    this.getInstances();
  }

  getSlider(id) {
    this.getInstance(id);
  }
}

export class SliderItem extends DomainInstance {

}
