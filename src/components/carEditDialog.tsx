
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, MenuItem, FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup } from '@mui/material';
import { ChangeEvent, useState, useEffect } from 'react';
import { Car, FormErrors, emptyCar } from '../types';
import { validateCar } from '../utils';

interface CarEditDialogProps {
    open: boolean,
    handleClose: () => void,
    editCar: (car: Car) => void,
    carData: Car
}

export default function CarEditDialog({open, handleClose, editCar, carData} : CarEditDialogProps){

    const [car, setCar] = useState<Car>(emptyCar)
    const [errors, setErrors] = useState<FormErrors>(emptyCar)

    useEffect(() => {
        setCar(carData === undefined ? emptyCar : carData)
    }, [carData])

    useEffect(() => { // Effect to re-validate form fields
        if (Object.values(errors).some((value) => value !== '')){
            validateCar({car, errors, setErrors})
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [car])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setCar({ ...car, [name]: value })
    }

    const handleSubmit = () => {
        if (!validateCar({car, errors, setErrors})) return
        editCar(car)
        handleClose()
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit Car</DialogTitle>
            <DialogContent>
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
                        <FormControlLabel value="Petrol" control={<Radio />} label="Petrol" />
                        <FormControlLabel value="Diesel" control={<Radio />} label="Diesel" />
                        <FormControlLabel value="Electric" control={<Radio />} label="Electric" />
                    </RadioGroup>
                    <FormHelperText>{errors.engine}</FormHelperText>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit}>Save</Button>
            </DialogActions>
        </Dialog>
    )
}