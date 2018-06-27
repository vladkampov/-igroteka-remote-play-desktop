import React from 'react';
import { observer, inject } from 'mobx-react';
import { IntlProvider } from 'react-intl';

const ObserverIntlProider = ({ uiStore: { locale, localeMessages }, children }) => (
  <IntlProvider locale={locale} messages={localeMessages} >
    {children}
  </IntlProvider>
);

export default inject('uiStore')(observer(ObserverIntlProider));
