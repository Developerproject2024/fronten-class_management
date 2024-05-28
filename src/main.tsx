import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from '@mui/material/styles';
import App from './App.tsx'
import theme from './theme.ts'; // Importa el tema si has configurado uno

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
     <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  </React.StrictMode>,
)
