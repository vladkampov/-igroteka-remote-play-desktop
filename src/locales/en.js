import { flattenObject } from '../utils';

/* eslint-disable max-len */
export default {
  lang: 'en',
  messages: flattenObject({
    breadcrumbs: {
      home: 'Home',
      catalog: 'Catalog',
      consoles: 'Consoles',
      games: 'Games',
      profile: 'Profile',
      profileEdit: 'Profile Editing',
    },
    header: {
      home: 'Homepage',
      catalog: 'Catalog',
      about: 'About',
      download: 'Download',
      pay: 'Pay',
      logout: 'Log out',
      profile: 'My Profile',
      login: 'Log in',
      signup: 'Sign up',
      emptyNotifications: 'You have no unreaded notifications.',
    },
    submenu: {
      consoles: 'Consoles',
      games: 'Games',
      demo: 'Download Demo',
      search: 'Search games',
    },
    catalog: {
      buyButton: 'Buy subscription',
      pay: {
        title: 'You choosed {name} Subscription type',
        body: 'Now it\'s type to choose the console to play!',
      },
    },
    login: {
      title: 'Log in',
      forgotPassword: 'I\'ve forgot my password',
      signup: 'Sign up',
      form: {
        identifier: 'Email or Username',
        password: 'Password',
        submit: 'Login',
      },
    },
    profile: {
      subscriptionLeft: '{left} left',
      till: 'till {end}',
      noSubscriptions: 'You have no active subscription',
      noSubscriptionButton: 'AVAILABLE OFFERS',
      activeSubscription: 'You have {paymentType} subscription for {consoleGroup}.',
      renewSubscription: 'RENEW SUBSCRIPTION',
      consoleTypeDetails: 'Console details',
      subscriptionDetails: 'Subscription details',
      gamesAvalaible: 'Games installed:',
      play: 'Play',
      playDemo: 'Try Demo',
    },
    consoleGroupDetails: {
      games: 'Games included',
      buyButton: 'Buy subscription',
      pay: {
        title: 'You choosed {name} Subscription type',
        body: 'You can choose this type of console to play!',
      },
    },
    gameDetails: {
      consoleGroups: 'This game are avalaible on',
      buyButton: 'Buy subscription to play this game',
      trailer: 'Check out the trailer',
      pay: {
        title: 'You choosed {name} Subscription type',
        body: 'You can choose this game and we\'ll provide you with console!',
      },
    },
    home: {
      title: 'This is a new way to play.',
      subtitle: 'To play Consoles games on your PC',
      callToAction: 'Learn more on website',
    },
  }),
};
