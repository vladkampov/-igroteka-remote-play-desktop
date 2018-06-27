import React from 'react';
import { Link } from 'react-router-dom';
import { GamePad } from '../../components';

export default () => (
  <div className="container">
    <GamePad />
    <h1>403 - Not Authorized</h1>
    <p>We are sorry, but the page you requested is not available for you.</p>
    <Link to="/" className="btn btn-default">Go to Homepage</Link>
  </div>
);

