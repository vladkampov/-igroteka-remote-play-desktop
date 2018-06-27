import { observable, action, computed } from 'mobx';
import { updateApi } from '../api';
import { localStorage } from '../utils';
import { login, register, getUser, resetPassword, recoverPassword, updateUser } from '../api/user';
import { markNotificationReaded } from '../api/notifications';

export default class UserStore {
  constructor() {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    if (token && user) {
      this.token = token;
      this.user = user;
      this.notifications = user.notifications ? user.notifications.reduce((acc, item) => {
        acc[item._id] = item;
        return acc;
      }, {}) : {};
      updateApi({ headers: { Authorization: `Bearer ${token}` } });
    }
  }

  @observable token = null;
  @observable user = null;
  @observable notifications = {};
  @observable isLoading = false;
  @observable loadingError = false;

  makeCall = (action, ...rest) => {
    this.isLoading = true;

    return action(...rest)
      .then(({ data }) => {
        this.isLoading = false;
        return data;
      })
      .catch(err => {
        this.isLoading = false;
        this.loadingError = true;
        return Promise.reject(err);
      });
  }

  saveUserData = data => {
    this.user = data.user;
    this.token = data.jwt;

    if (data.user.notifications) {
      this.notifications = data.user.notifications.reduce((acc, item) => {
        acc[item._id] = item;
        return acc;
      }, {});
    }

    localStorage.setItem('token', data.jwt);
    localStorage.setItem('user', JSON.stringify(data.user));
    updateApi({ headers: { Authorization: `Bearer ${data.jwt}` } });

    return data;
  }

  @action login = data => this.makeCall(login, data)
    .then(this.saveUserData);

  @action logout = () => new Promise(resolve => {
    this.token = null;
    this.user = null;
    this.notifications = {};
    updateApi({ headers: {} });
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    resolve();
  });

  @action register = data => this.makeCall(register, data)
    .then(this.saveUserData);

  @action getUser = () => this.makeCall(getUser)
    .then(data => {
      this.user = data;
      localStorage.setItem('user', JSON.stringify(data));
      return data;
    });

  @action resetPassword = data => this.makeCall(resetPassword, data);

  @action recoverPassword = data => this.makeCall(recoverPassword, data);

  @action updateUser = data => this.makeCall(updateUser, this.userId, data)
    .then(data => {
      this.user = data;
      localStorage.setItem('user', JSON.stringify(data));
      return data;
    });

  @action markNotificationReaded = id => markNotificationReaded(id)
    .then(({ data }) => {
      delete this.notifications[data.id];
      this.notifications[data.id] = data;
      return data;
    });

  @computed get authenticated() {
    return !!(this.user && this.token);
  }

  @computed get userId() {
    return this.user ? this.user._id : null;
  }

  @computed get unreadedNotifications() {
    return Object.keys(this.notifications).reduce((acc, key) => {
      if (!this.notifications[key].readed) {
        return acc.concat(this.notifications[key]);
      }

      return acc;
    }, []);
  }
}
