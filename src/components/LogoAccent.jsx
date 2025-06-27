import React from 'react';
import {assets} from '../../constants';
import {Link} from 'react-router-dom';

const LogoAccent = () => {
  return (
    <Link to={'/'}>
      <div className="logo flex items-center gap-2">
        <img className="w-[40%]" src={assets.logo} alt="" />
      </div>
    </Link>
  );
};

export default LogoAccent;
