import React from 'react';
import { createRoot } from 'react-dom/client'; // Import from react-dom/client
import { BrowserRouter as Router } from 'react-router-dom'

import App from './App'
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';

// Create a root element using createRoot
const root = createRoot(document.getElementById('root'));

// Render the app inside the root element
root.render(
  <Router>
    <GoogleOAuthProvider clientId='1079988461729-bduh232b58g2omn7pkatkde6e4ng6fc9.apps.googleusercontent.com'>
     <App /> 
    </GoogleOAuthProvider>
  </Router>
);

