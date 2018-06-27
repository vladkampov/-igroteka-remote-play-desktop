import { GameStore } from './gameStore';
import { ConsoleStore } from './consoleStore';
import { ConsoleGroupStore } from './consoleGroupStore';
import { PaymentTypeStore } from './paymentTypeStore';
import { SliderItemStore } from './sliderItemStore';
import UserStore from './userStore';

export default class DomainStore {
  constructor() {
    this.gameStore = new GameStore();
    this.consoleStore = new ConsoleStore();
    this.consoleGroupStore = new ConsoleGroupStore();
    this.paymentTypeStore = new PaymentTypeStore();
    this.userStore = new UserStore();
    this.sliderItemStore = new SliderItemStore();
  }
}
