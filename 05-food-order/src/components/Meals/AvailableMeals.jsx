import React from 'react'
import { DUMMY_MEALS } from '../../constants'

import './AvailableMeals.css'

const AvailableMeals = () => {
  const mealsList = DUMMY_MEALS.map(meal => <li>{meal.name}</li>)

  return (
    <section className='available_meals'>
      <ul>
        {mealsList}
      </ul>
    </section>
  )
}

export default AvailableMeals