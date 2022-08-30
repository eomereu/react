import React from 'react';

import { images } from '../../constants';
import './Header.css';

import HeaderCartButton from './HeaderCartButton';
import ButtonC from '../UI/Buttons/ButtonC';

const Header = (props) => {
  return (
    <>
      <header className='header'>
        <h1>ReactMeals</h1>
        <div className='header-right'>
          <ButtonC onClick={props.onAdminMode} >Toggle Admin Mode</ButtonC>
          <HeaderCartButton onClick={props.onOpenCart} />
        </div>
      </header>
      <div className='header-main_image'>
        <img src={images.headerMeals} alt="React Meals" />
      </div>
    </>
  )
}

export default Header;