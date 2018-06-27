import { observable, action } from 'mobx';
import { configureValidator } from 'reactive-mobx-form';
import moment from 'moment';
import { localStorage } from '../utils';
import * as locales from '../locales';


export default class UiStore {
  constructor() {
    const detectedLang = this.detectLocale();

    this.locale = detectedLang;
    this.localeMessages = locales[detectedLang].messages;
    configureValidator({ language: detectedLang });
    moment.locale(detectedLang);
  }

  @observable locale = '';
  @observable localeMessages = {};

  detectLocale = () => {
    const supported = ['en']; // , 'uk', 'ru'
    const { location } = window;
    const detectors = [
      () => (location && [location.pathname.replace('/', '')]),
      () => (location && location.search ?
        [(location.search.match(/((locale)|(lang))=(\w+)/) || [])[4]] : []),
      () => (localStorage ? [localStorage.getItem('lang'), localStorage.getItem('locale')] : []),
      () => (navigator ? [...(navigator.languages || []), navigator.userLanguage, navigator.language] : []),
      () => ['en'], // , 'uk', 'ru'
    ];

    return detectors
      .reduce((locale, detector) =>
        locale || detector().filter(v => !!v).filter(v => supported.includes(v))[0], '');
  }

  @action changeLanguage = lang => {
    localStorage.setItem('lang', lang);

    this.locale = lang;
    this.localeMessages = locales[lang].messages;
    configureValidator({ language: lang });
    moment.locale(lang);
  };
}
