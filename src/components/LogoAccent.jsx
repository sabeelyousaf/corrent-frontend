import React from 'react';
import {assets} from '../../constants';
import {Link} from 'react-router-dom';

const LogoAccent = () => {
  return (
    <Link to={'/'}>
      <div className="logo flex items-center gap-2">
        <img className="w-8" src={assets.logo} alt="" />
        <p className="text-lg font-semibold text-shadow-accent_blue_dark">
          Corrent
        </p>
      </div>
    </Link>
  );
};

export default LogoAccent;
