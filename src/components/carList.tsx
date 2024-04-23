import { Car } from '../types'
import './carList.css'

export default function CarList({ cars, setCars } : { cars: Car[], setCars: (cars: Car[]) => void}) {

    const deleteCar = (i : number) => { // Function to delete a car from the list
        document.getElementById(`car-list-${i}`)?.classList.add('delete')
        setTimeout(() => {
            const newCars = [...cars]
            newCars.splice(i, 1)
            setCars(newCars)
            document.getElementById(`car-list-${i}`)?.classList.remove('delete')
        }, 300)
    }

    return (
        <ul className='car-list'>
            {cars.map((car, i) => {
                return (
                <li id={`car-list-${i}`} key={i}>
                    <div>
                        <p>Maker: {car.maker}</p>
                        <p>Model: {car.model}</p>
                        <p>Year: {car.year}</p>
                    </div>
                    <button onClick={() => {deleteCar(i)}}>Delete</button>
                </li>
            )
            })}
        </ul>
    )
}