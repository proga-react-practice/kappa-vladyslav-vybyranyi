import { Car } from '../types'
import './carList.css'

export default function CarList({ cars, setCars } : { cars: Car[], setCars: (cars: Car[]) => void}) {

    return (
        <ul className='car-list'>
            {cars.map((car, i) => {

                const deleteCar = () => { // Function to delete a car
                    document.getElementById(`car-list-${i}`)?.classList.add('delete')
                    setTimeout(() => {
                        const newCars = [...cars]
                        newCars.splice(i, 1)
                        setCars(newCars)
                        document.getElementById(`car-list-${i}`)?.classList.remove('delete')
                    }, 300)
                }

                return (
                <li id={`car-list-${i}`} key={i}>
                    <div>
                        <p>Maker: {car.maker}</p>
                        <p>Model: {car.model}</p>
                        <p>Year: {car.year}</p>
                    </div>
                    <button onClick={deleteCar}>Delete</button>
                </li>
            )
            })}
        </ul>
    )
}