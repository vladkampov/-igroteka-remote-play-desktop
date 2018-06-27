import { getGames, getGame } from '../api/games';
import { DomainInstanceStore, DomainInstance } from './domainInstanceStore';


export class GameStore extends DomainInstanceStore {
  constructor() {
    super(Game, getGames, getGame); // eslint-disable-line no-this-before-super
  }

  getGames() {
    this.getInstances();
  }

  getGameDetails = id => this.getInstance(id);
}

export class Game extends DomainInstance {
  /*
    {
      id,
      name,
      description,
      consoles: ['id', ...],
      avalaible
    }
  */
}
