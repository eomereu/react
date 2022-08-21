import React from 'react'

import './HeaderCartButton.css'

import CartIcon from '../Cart/CartIcon'

const HeaderCartButton = () => {
  return (
    <button className='hcb__button'>
      <span className='hcb__icon'>
        <CartIcon />
      </span>
      <span>Cart</span>
      <span className='hcb__badge'>3</span>
    </button>
  )
}

export default HeaderCartButton