import { ChangeEvent, FormEvent, useState } from 'react'
import { Car } from '../types'
import './carForm.css'

export default function CarForm({ cars, setCars} : { cars: Car[], setCars: (cars: Car[]) => void}){
    const [car, setCar] = useState({ maker: '', model: '', year: '' }) // Car object state
    const [errors, setErrors] = useState<string[]>([]) // Errors state

    const validate = () => { // Function to validate form fields
        const errors = []
        if (car.model === '') errors.push('Model is required')
        if (car.year === '') errors.push('Year is required')
        if (car.maker === '') errors.push('Maker is required')
        setErrors(errors)
        return errors.length === 0
    }
    
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => { // Handler for input changes
        const { name, value } = e.target
        setCar({ ...car, [name]: value })
    }

    const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => { // Handler for select changes
        const { name, value } = e.target
        setCar({ ...car, [name]: value })
    }
    
    const handleSubmit = (e: FormEvent) => { // Handler for form submission
        e.preventDefault()
        if (!validate()) return
        setCars([...cars, car])
        setCar({ maker: '', model: '', year: '' })
    }

    
    return (
        <form className='car-form' onSubmit={handleSubmit}>
            
            <input
                type="text"
                name="model"
                value={car.model}
                onChange={handleChange}
                placeholder="Model"
            />
            <p className='error'>{errors[2]}</p>
            <input
                type="number"
                min={1900}
                max={2024}
                minLength={4}
                maxLength={4}
                name="year"
                defaultValue={2000}
                value={car.year}
                onChange={handleChange}
                placeholder="Year"
            />
            <p className='error'>{errors[1]}</p>
            <select name="maker" value={car.maker} onChange={handleSelectChange}>
                <option value="">Select Maker</option>
                <option value="Toyota">Toyota</option>
                <option value="Honda">Honda</option>
                <option value="Ford">Ford</option>
            </select>
            <p className='error'>{errors[0]}</p>
            <button type="submit">Add Car</button>
        </form>
    )
}