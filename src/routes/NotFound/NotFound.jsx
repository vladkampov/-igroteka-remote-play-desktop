import React from 'react';
import { Link } from 'react-router-dom';
import { GamePad } from '../../components';


export default () => (
  <div className="container NotFound">
    <GamePad />
    <h1>404 - Not Found</h1>
    <p>We are sorry, but the page you requested is not available.</p>
    <Link to="/" className="btn btn-default">Go to Homepage</Link>
  </div>
);
