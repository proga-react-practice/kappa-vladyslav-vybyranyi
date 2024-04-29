export interface Car { // Car object fields
    maker: string
    model: string
    year: string
}

export interface FormErrors extends Car {}

export const emptyCar: Car = { maker: '', model: '', year: '' } // Empty car object