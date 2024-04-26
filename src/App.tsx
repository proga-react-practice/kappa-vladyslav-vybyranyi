import CarForm from './components/carForm'
import { useState } from 'react'
import { Car } from './types'
import CarList from './components/carList'
import { Box, Button, Container, Divider, ThemeProvider, createTheme } from '@mui/material'
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';

const lightTheme = createTheme({
  palette: {
    primary: {
      main: '#7c3aed'
    },
  }
})

const solarizedLight = createTheme({
  palette: {
    primary: {
      main: '#268bd2'
    },
    secondary: {
      main: '#859900'
    },
    background: {
      default: '#fdf6e3'
    }
  }
})

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#7c3aed'
    },
  }
})

const solarizedDark = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#268bd2'
    },
    secondary: {
      main: '#859900'
    },
    background: {
      default: '#002b36'
    }
  }
})

const themes = [
  { theme: lightTheme, icon: <LightModeIcon />},
  { theme: darkTheme, icon: <DarkModeIcon />},
  { theme: solarizedLight, icon: <Brightness7Icon />},
  { theme: solarizedDark, icon: <Brightness4Icon />},
]

function App() {
  const [cars, setCars] = useState<Car[]>([]) // Car array state
  const [themeIndex, setThemeIndex] = useState(0)

  function changeTheme() {
    setThemeIndex((themeIndex + 1) % themes.length)
  }
  

  return (
    <ThemeProvider theme={themes[themeIndex].theme} >
      <Box 
        sx={{height: '100vh', width: '100vw', alignContent: 'center', bgcolor: 'background.default'}}
        className='cars-container'>
          <Container sx={{display: 'flex', justifyContent: 'center'}}>
            <CarForm cars={cars} setCars={setCars} />
            {cars.length !== 0 && <Divider orientation='vertical' flexItem variant='middle' sx={{m: 2}} />}
            <CarList cars={cars} setCars={setCars} />
          </Container>
          <Button sx={{position: 'absolute', top: 5, right: 5}} onClick={changeTheme} variant='text'>{themes[themeIndex].icon}</Button>
      </Box>
    </ThemeProvider>
  )
}

export default App
