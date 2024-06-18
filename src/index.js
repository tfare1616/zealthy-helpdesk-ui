import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import Layout from './routes'
import Header from './modules/Header'
import { ThemeProvider, createTheme } from '@mui/material/styles';

const root = ReactDOM.createRoot(document.getElementById('root'));

const theme = createTheme({
  palette: {
    primary: {
      light: '#ff7961',
      main: '#ba000d', //'#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});

root.render(
  <React.StrictMode>
  <BrowserRouter>
  <ThemeProvider theme={theme}>
    <div className={'app'}>
    <Header />
    <div className={'contentWrapper'}>
      <Layout/>
    </div>
    </div>
    </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
