import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { Car, FormErrors } from '../types'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import { Button, ButtonGroup, MenuItem, Typography } from '@mui/material';

import { validateCar } from '../utils'

interface CarFormProps { addCar: (car: Car) => void }

export default function CarForm({ addCar } : CarFormProps){
    const [car, setCar] = useState({ maker: '', model: '', year: '' }) // Car object state
    const [errors, setErrors] = useState<FormErrors>({
        model: '', year: '', maker: ''
    }) // Errors state

    useEffect(() => { // Effect to re-validate form fields
        if (Object.values(errors).some((value) => value !== '')){
            validateCar({car, errors, setErrors})
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [car])
    
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => { // Handler for input changes
        const { name, value } = e.target
        setCar({ ...car, [name]: value })
    }
    
    const handleSubmit = (e: FormEvent) => { // Handler for form submission
        e.preventDefault()
        if (!validateCar({car, errors, setErrors})) return
        addCar(car)
        setCar({ maker: '', model: '', year: '' })
    }

    const handleReset = () => { // Handler for form reset
        setCar({ maker: '', model: '', year: '' })
        setErrors({ model: '', year: '', maker: ''})
    }

    
    return (
        <Card>
            <CardContent sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Typography variant='h4' sx={{margin: 1}}>Add Car</Typography>
            
                <TextField
                    sx={{margin: 1, width: '100%'}}
                    required
                    type="outlined"
                    name='model'
                    value={car.model}
                    onChange={handleChange}
                    label="Model"
                    error={Boolean(errors.model)}
                    helperText={errors.model}
                />
                <TextField
                    sx={{margin: 1, width: '100%'}}
                    required
                    type="outlined"
                    name='year'
                    value={car.year}
                    onChange={handleChange}
                    label="Year"
                    error={Boolean(errors.year)}
                    helperText={errors.year}
                />
                <TextField 
                    sx={{ width: '100%', margin: 1}} 
                    label="Maker" 
                    name='maker' 
                    select 
                    required
                    defaultValue=""
                    value={car.maker} 
                    error={Boolean(errors.maker)}
                    helperText={errors.maker}
                    onChange={handleChange} >
                        <MenuItem value="">Select Maker</MenuItem>
                        <MenuItem value="Toyota">Toyota</MenuItem>
                        <MenuItem value="Honda">Honda</MenuItem>
                        <MenuItem value="Ford">Ford</MenuItem>
                </TextField>
                <ButtonGroup sx={{margin: 1}}>
                    <Button variant='outlined' onClick={handleReset}>Clear</Button>
                    <Button variant='contained' onClick={handleSubmit}>Add Car</Button>
                </ButtonGroup>
            </CardContent>
        </Card>
    )
}