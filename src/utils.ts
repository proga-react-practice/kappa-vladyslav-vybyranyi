import { Car, FormErrors } from "./types"

interface validateCarProps {
    car: Car,
    errors: FormErrors,
    setErrors: (errors: FormErrors) => void
}

function capitalizeFirstLetter(string: string) { // Function to capitalize the first letter of a string
    return string.charAt(0).toUpperCase() + string.slice(1)
}

export const validateCar = ({car, errors, setErrors} : validateCarProps) => { // Function to validate form fields
    const currentYear = new Date().getFullYear()
    let correct = true
    Object.keys(errors).forEach((key) => {
        if (!car[key as keyof Car]) {
            errors[key as keyof Car] = `${capitalizeFirstLetter(key)} is required`
            correct = false
        } else {
            errors[key as keyof Car] = ''
        }
    })

    if (!errors.year && !(parseInt(car.year) > 1900 && parseInt(car.year) < currentYear)) {
        errors.year = 'Year must be between 1900 and ' + currentYear
        correct = false
    }
    
    setErrors({ ...errors })
    return correct
}