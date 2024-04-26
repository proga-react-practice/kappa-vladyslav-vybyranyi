import { Button, Card, CardContent, Container, Box, List, ListItem, Slide } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import { Car } from '../types'
import { useEffect, useState } from 'react';

export default function CarList({ cars, setCars } : { cars: Car[], setCars: (cars: Car[]) => void}) {

    const [visibleCars, setVisibleCars] = useState<boolean[]>(cars.map(() => true))

    useEffect(() => {
        setVisibleCars(cars.map(() => true))
    }, [cars])

    const deleteCar = (i : number) => { // Function to delete a car from the list
        setVisibleCars(visibleCars.map((_, index) => index === i ? false : true))
        
        setTimeout(() => {
            const newCars = [...cars]
            newCars.splice(i, 1)
            setCars(newCars)
        }, 500)
    }

    return (
        <List sx={{ overflowY: 'auto', 
                    overflowX: 'hidden', 
                    height: 400,
                    scrollbarColor: (theme) => `${theme.palette.primary.main} ${theme.palette.background.default}`}}>
            {cars.map((car, i) => (
                <ListItem key={i}>
                    <Slide direction='left' in={visibleCars[i]} unmountOnExit mountOnEnter timeout={500}>
                        <Card sx={{width: 300}}>
                            <CardContent>
                                <Box display='flex'>
                                    <Container>
                                        <p><b>Maker: </b>{car.maker}</p>
                                        <p><b>Model: </b> {car.model}</p>
                                        <p><b>Year: </b> {car.year}</p>
                                    </Container>
                                    <Button variant='outlined' color='error' onClick={() => {deleteCar(i)}}><DeleteIcon /></Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </Slide>
                </ListItem>
            ))}
        </List>
    )
}