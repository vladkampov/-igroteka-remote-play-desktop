import React from 'react';
import { Grid } from 'react-bootstrap';
import './Loader.scss';

export default () => (
  <div className="Loader">
    <Grid>
      <div className="pacman" />
      <div className="dot" />
    </Grid>
  </div>
);
