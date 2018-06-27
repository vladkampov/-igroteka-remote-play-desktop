import { getConsoleGroups, getConsoleGroup } from '../api/consoleGroups';
import { DomainInstanceStore, DomainInstance } from './domainInstanceStore';


export class ConsoleGroupStore extends DomainInstanceStore {
  constructor() {
    super(ConsoleGroup, getConsoleGroups, getConsoleGroup); // eslint-disable-line no-this-before-super
  }

  getConsoleGroups() {
    this.getInstances();
  }

  getConsoleGroupDetails = id => this.getInstance(id);
}

export class ConsoleGroup extends DomainInstance {

}
