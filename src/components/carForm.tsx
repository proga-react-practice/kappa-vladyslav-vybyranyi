import { ChangeEvent, FormEvent, useState } from 'react'
import { Car } from '../types'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import { Button, ButtonGroup, MenuItem } from '@mui/material';

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

    // const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => { // Handler for select changes
    //     const { name, value } = e.target
    //     setCar({ ...car, [name]: value })
    // }
    
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
        <Card>
            <CardContent sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <h2>Add Car</h2>
            
                <TextField
                    required
                    type="outlined"
                    name='model'
                    value={car.model}
                    onChange={handleChange}
                    label="Model"
                />
                <p className='error'>{errors.model}</p>
                <TextField
                    required
                    type="outlined"
                    name='year'
                    value={car.year}
                    onChange={handleChange}
                    label="Year"
                />
                <p className='error'>{errors.year}</p>
                <TextField 
                    sx={{ width: '100%' }} 
                    label="Maker" 
                    name='maker' 
                    select 
                    required
                    value={car.maker} 
                    onChange={handleChange} >
                        <MenuItem value="Toyota">Toyota</MenuItem>
                        <MenuItem value="Honda">Honda</MenuItem>
                        <MenuItem value="Ford">Ford</MenuItem>
                </TextField>
                <p className='error'>{errors.maker}</p>
                <ButtonGroup>
                    <Button variant='outlined' onClick={handleReset}>Clear</Button>
                    <Button variant='contained' onClick={handleSubmit}>Add Car</Button>
                </ButtonGroup>
            </CardContent>
        </Card>
    )
}