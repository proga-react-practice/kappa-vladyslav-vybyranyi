import './App.css'
import CarForm from './components/carForm'
import { useState } from 'react'
import { Car } from './types'
import CarList from './components/carList'

function App() {
  const [cars, setCars] = useState<Car[]>([]) // Car array state

  

  return (
    <div className='cars-container'>
      <CarForm cars={cars} setCars={setCars} />
      <div className='divider'/>
      <CarList cars={cars} setCars={setCars} />
    </div>
  )
}

export default App
