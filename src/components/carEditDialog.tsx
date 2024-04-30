
import { Dialog, DialogActions, DialogContent, DialogTitle, Button} from '@mui/material';
import { ChangeEvent, useState, useEffect } from 'react';
import { Car, FormErrors, emptyCar } from '../types';
import { validateCar } from '../utils';
import { FormFields } from './carForm';

interface CarEditDialogProps {
    open: boolean,
    handleClose: () => void,
    editCar: (car: Car) => void,
    carData: Car | undefined
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
                <FormFields car={car} errors={errors} handleChange={handleChange} />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit}>Save</Button>
            </DialogActions>
        </Dialog>
    )
}