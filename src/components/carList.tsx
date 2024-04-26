import { Button, Card, CardContent, Container, Box, List, ListItem, Slide, Typography, ButtonGroup } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Car } from '../types'
import { useEffect, useState } from 'react';

interface CarListProps {
    cars: Car[],
    deleteCar: (i: number) => void
    editCar: (i: number) => void
}

export default function CarList({ cars, deleteCar, editCar } : CarListProps) {

    const [visibleCars, setVisibleCars] = useState<boolean[]>(cars.map(() => true))

    useEffect(() => {
        setVisibleCars(cars.map(() => true))
    }, [cars])

    const handleDelete = (i : number) => { // Function to animate car deletion from the list
        setVisibleCars(visibleCars.map((_, index) => index === i ? false : true))
        
        setTimeout(() => {
            deleteCar(i)
        }, 500)
    }

    const handleEdit = (i : number) => { // Function to animate car edition from the list
        editCar(i)
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
                                        <Typography><b>Maker: </b>{car.maker}</Typography>
                                        <Typography><b>Model: </b> {car.model}</Typography>
                                        <Typography><b>Year: </b> {car.year}</Typography>
                                    </Container>
                                    <ButtonGroup orientation='vertical'>
                                        <Button variant='outlined' color='warning' onClick={() => {handleEdit(i)}}><EditIcon /></Button>
                                        <Button variant='outlined' color='error' onClick={() => {handleDelete(i)}}><DeleteIcon /></Button>
                                    </ButtonGroup>
                                </Box>
                            </CardContent>
                        </Card>
                    </Slide>
                </ListItem>
            ))}
        </List>
    )
}