import CarForm from './components/carForm'
import { useState } from 'react'
import { Car } from './types'
import VCV from '../lib/vcv'
import CarList from './components/carList'
import CarEditDialog from './components/carEditDialog'
import CarHistory from './components/carsHistory'
import { Box, Button, Container, Divider, ThemeProvider} from '@mui/material'

import themes from './themes'

function App() {
	const { state : cars, 
					setValue : setCars, 
					revertTo : revertCommit, 
					history : commitHistory } = VCV<Car[]>([]) // Car array state
	const [themeIndex, setThemeIndex] = useState(0)
	const [editDialogOpen, setEditDialogOpen] = useState(false)
	const [editIndex, setEditIndex] = useState(-1)

	function changeTheme() {
		setThemeIndex((themeIndex + 1) % themes.length)
	}

	function addCar(car: Car) { // Function to add a car to the list
		setCars([...cars, car])
	}

	function deleteCar(i: number) { // Function to delete a car from the list
		setCars(cars.filter((_, index) => index !== i))
	}
	
	function editCar(i: number, car: Car) { // Function to edit a car from the list
		setCars(cars.map((c, index) => index === i ? car : c))
	}

	function handleEdit(i: number) { // Function to handle car edition
		setEditIndex(i)
		setEditDialogOpen(true)
	}

	return (
		<ThemeProvider theme={themes[themeIndex].theme} >
			<Box 
				sx={{height: '100vh', width: '100vw', alignContent: 'center', justifyContent: "center", bgcolor: 'background.default'}}
				className='cars-container'>
					<Container sx={{display: 'flex', maxHeight: '80vh', flexDirection: {xs: "column", md: "row"}, justifyContent: 'center', alignItems: "center"}}>
						<CarForm addCar={addCar} />
						{cars.length !== 0 && <Divider orientation='vertical' flexItem variant='middle' sx={{m: 2}} />}
						<Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'end'}}>
							<CarHistory 
								history={commitHistory} 
								revertTo={revertCommit}/>
							<CarList cars={cars} deleteCar={deleteCar} editCar={handleEdit} />
						</Box>
					</Container>
					<Button sx={{position: 'absolute', top: 5, right: 5}} onClick={changeTheme} variant='text'>{themes[themeIndex].icon}</Button>
					<CarEditDialog 
						open={editDialogOpen} 
						handleClose={() => setEditDialogOpen(false)} 
						editCar={(car) => editCar(editIndex, car)}
						carData={cars[editIndex]}
					/>
			</Box>
		</ThemeProvider>
	)
}

export default App
