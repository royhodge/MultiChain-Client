// Services
import React from 'react';
import ReactDOM from 'react-dom';
import { SnackbarProvider } from 'notistack';
// Containers
import App from './containers/Installer';

const rootElement = document.querySelector(document.currentScript.getAttribute('data-container'));

ReactDOM.render(
  <SnackbarProvider maxSnack={3} autoHideDuration={1000}>
    <App />
  </SnackbarProvider>,
  rootElement,
);
