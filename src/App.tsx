import { createTheme } from '@mui/material';
import React from 'react';

// Initialize the MUI Theme
const theme = createTheme({
  palette: {
    primary: {
      light: '#55af86',
      main: '#198755',
      dark: '#00522d',
      contrastText: '#fff'
    },
    secondary: {
      light: '#fec57b',
      main: '#ce7e24',
      dark: '#774300',
      contrastText: '#000'
    }
  }
});

function App() {
  return (
    <div className="App">
      <h1>Welcome to my app</h1>
    </div>
  );
}

export default App;
