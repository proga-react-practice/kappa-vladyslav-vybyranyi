import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { Car, FormErrors, emptyCar, engineTypes } from '../types'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import { Button, ButtonGroup, FormControl, FormControlLabel, FormHelperText, FormLabel, MenuItem, Radio, RadioGroup, Typography } from '@mui/material';

import { validateCar } from '../utils'

interface CarFormProps { addCar: (car: Car) => void }

interface FormFieldsProps {
    car: Car,
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void,
    errors: FormErrors
}

export function FormFields({ car, handleChange, errors } : FormFieldsProps) {
    return (
        <>
            <TextField
                sx={{marginY: 1}}
                label='Maker'
                name='maker'
                select
                value={car.maker}
                onChange={handleChange}
                error={errors.maker !== ''}
                helperText={errors.maker}
                fullWidth>
                    <MenuItem value="">Select Maker</MenuItem>
                    <MenuItem value="Toyota">Toyota</MenuItem>
                    <MenuItem value="Honda">Honda</MenuItem>
                    <MenuItem value="Ford">Ford</MenuItem>
            </TextField>
            <TextField
                sx={{marginY: 1}}
                label='Model'
                name='model'
                value={car.model}
                onChange={handleChange}
                error={errors.model !== ''}
                helperText={errors.model}
                fullWidth
            />
            <TextField
                sx={{marginY: 1}}
                label='Year'
                name='year'
                value={car.year}
                onChange={handleChange}
                error={errors.year !== ''}
                helperText={errors.year}
                fullWidth
            />
            <FormControl required component="fieldset" error={Boolean(errors.engine)}>
                <FormLabel component="legend">Engine Type</FormLabel>
                <RadioGroup 
                    row
                    aria-label="engine" 
                    name="engine" 
                    value={car.engine} 
                    onChange={handleChange}>
                    {engineTypes.map((engine) => (<FormControlLabel value={engine} control={<Radio />} label={engine} />))}
                </RadioGroup>
                <FormHelperText>{errors.engine}</FormHelperText>
            </FormControl>
        </>
    )
}

export default function CarForm({ addCar } : CarFormProps){
    const [car, setCar] = useState(emptyCar) // Car object state
    const [errors, setErrors] = useState<FormErrors>(emptyCar) // Errors state

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
        setCar(emptyCar)
    }

    const handleReset = () => { // Handler for form reset
        setCar(emptyCar)
        setErrors(emptyCar)
    }

    
    return (
        <Card sx={{overflowY: "auto", scrollbarColor: (theme) => `${theme.palette.primary.main} ${theme.palette.background.default}`}}>
            <CardContent sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Typography variant='h4' sx={{margin: 1}}>Add Car</Typography>
            
                <FormFields car={car} handleChange={handleChange} errors={errors} />

                <ButtonGroup sx={{margin: 1}}>
                    <Button variant='outlined' onClick={handleReset}>Clear</Button>
                    <Button variant='contained' onClick={handleSubmit}>Add Car</Button>
                </ButtonGroup>
            </CardContent>
        </Card>
    )
}