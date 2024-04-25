import { ChangeEvent, FormEvent, useState } from 'react'
import { Car } from '../types'
import './carForm.css'

interface CarFormProps { cars: Car[], setCars: (cars: Car[]) => void }
interface FormErrors extends Car {}

function capitalizeFirstLetter(string: string) { // Function to capitalize the first letter of a string
    return string.charAt(0).toUpperCase() + string.slice(1)
}

export default function CarForm({ cars, setCars} : CarFormProps){
    const [car, setCar] = useState({ maker: '', model: '', year: '' }) // Car object state
    const [errors, setErrors] = useState<FormErrors>({
        model: '', year: '', maker: ''
    }) // Errors state

    const validate = () => { // Function to validate form fields
        let correct = true
        Object.keys(errors).forEach((key) => {
            if (!car[key as keyof Car]) {
                errors[key as keyof Car] = `${capitalizeFirstLetter(key)} is required`
                correct = false
            } else {
                errors[key as keyof Car] = ''
            }
        })
        setErrors({ ...errors })
        return correct
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

    const handleReset = () => { // Handler for form reset
        setCar({ maker: '', model: '', year: '' })
        setErrors({ model: '', year: '', maker: ''})
    }

    
    return (
        <form className='car-form' onReset={handleReset} onSubmit={handleSubmit}>
            
            <input
                type="text"
                name="model"
                value={car.model}
                onChange={handleChange}
                placeholder="Model"
            />
            <p className='error'>{errors.model}</p>
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
            <p className='error'>{errors.year}</p>
            <select name="maker" value={car.maker} onChange={handleSelectChange}>
                <option value="">Select Maker</option>
                <option value="Toyota">Toyota</option>
                <option value="Honda">Honda</option>
                <option value="Ford">Ford</option>
            </select>
            <p className='error'>{errors.maker}</p>
            <button type="reset">Clear</button>
            <button type="submit">Add Car</button>
        </form>
    )
}