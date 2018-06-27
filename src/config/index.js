const defaults = {
  CORE_API_DOMAIN: 'http://162.247.13.110:1337',
  WEBSITE_URL: 'http://localhost:3000',
};

const prefix = 'REACT_APP_';

export default key => process.env[`${prefix}${key}`] || defaults[key];
