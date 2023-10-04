import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from 'firebase/app';
import { BrowserRouter } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const firebaseConfig = {
  apiKey: "AIzaSyCp9wO2bvT6L87d9ZcLkZNEYR9KeJv667c",
  authDomain: "hotel-booking-web-app.firebaseapp.com",
  projectId: "hotel-booking-web-app",
  storageBucket: "hotel-booking-web-app.appspot.com",
  messagingSenderId: "3475608742",
  appId: "1:3475608742:web:3de913912149ceeca65067",
  measurementId: "G-2L6M4LB2DX"
};

firebase.initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
