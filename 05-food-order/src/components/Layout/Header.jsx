import React from 'react';

import { images } from '../../constants';
import './Header.css';

const Header = () => {
  return (
    <>
      <header className='header'>
        <h1>ReactMeals</h1>
        <button>Cart</button>
      </header>
      <div className='header-main_image'>
        <img src={images.headerMeals} alt="React Meals" />
      </div>
    </>
  )
}

export default Header;