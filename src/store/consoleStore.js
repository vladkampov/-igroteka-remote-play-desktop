import { getConsoles, getConsole } from '../api/consoles';
import { DomainInstanceStore, DomainInstance } from './domainInstanceStore';


export class ConsoleStore extends DomainInstanceStore {
  constructor() {
    super(Console, getConsoles, getConsole); // eslint-disable-line no-this-before-super
  }

  getConsoles() {
    this.getInstances();
  }

  getConsoleDetails(id) {
    this.getInstance(id);
  }
}

export class Console extends DomainInstance {
  /*
    {
      id,
      name,
      description,
      games: [],
      groupId,
      avalaible
    }
  */
}
