import React from 'react'

import './HeaderCartButton.css'

import CartIcon from '../Cart/CartIcon'

const HeaderCartButton = (props) => {
  return (
    <button onClick={props.onClick} className='hcb__button'>
      <span className='hcb__icon'>
        <CartIcon />
      </span>
      <span>Cart</span>
      <span className='hcb__badge'>3</span>
    </button>
  )
}

export default HeaderCartButton