import React from 'react';

import { images } from '../../constants';
import './Header.css';

import HeaderCartButton from './HeaderCartButton';

const Header = () => {
  return (
    <>
      <header className='header'>
        <h1>ReactMeals</h1>
        <HeaderCartButton />
      </header>
      <div className='header-main_image'>
        <img src={images.headerMeals} alt="React Meals" />
      </div>
    </>
  )
}

export default Header;