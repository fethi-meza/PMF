import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter
import { ChakraProvider } from '@chakra-ui/react';
import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <Router> 
        <App />
      </Router>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
