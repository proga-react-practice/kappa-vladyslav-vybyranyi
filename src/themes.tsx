import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { createTheme } from '@mui/material'

const lightTheme = createTheme({
	palette: {
		primary: {
			main: '#7c3aed'
		},
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					borderRadius: 10
				}
			}
		},
		MuiCard: {
			styleOverrides: {
				root: {
					borderRadius: 10
				}
			}
		}
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
},
components: {
	MuiButton: {
		styleOverrides: {
			root: {
				borderRadius: 0
			}
		}
	},
	MuiCard: {
		styleOverrides: {
			root: {
				borderRadius: 0
			}
		}
	}
}
})

const darkTheme = createTheme({
	palette: {
		mode: 'dark',
		primary: {
			main: '#7c3aed'
		},
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					borderRadius: 10
				}
			}
		},
		MuiCard: {
			styleOverrides: {
				root: {
					borderRadius: 10
				}
			}
		}
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
		},
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					borderRadius: 0
				}
			}
		},
		MuiCard: {
			styleOverrides: {
				root: {
					borderRadius: 0
				}
			}
		}
	}
})

const themes = [
{ theme: lightTheme, icon: <LightModeIcon />},
{ theme: darkTheme, icon: <DarkModeIcon />},
{ theme: solarizedLight, icon: <Brightness7Icon />},
{ theme: solarizedDark, icon: <Brightness4Icon />},
]

export default themes