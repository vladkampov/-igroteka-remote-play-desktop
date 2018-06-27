import React, { Fragment } from 'react';

export default Wrapped => ({ ...rest }) => (
  <Fragment>
    <Wrapped {...rest} />
  </Fragment>
);
