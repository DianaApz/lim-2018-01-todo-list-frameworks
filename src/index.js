import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import firebase from 'firebase';
import App from './App';

import serviceWorker from './serviceWorker';
firebase.initializeApp({
    apiKey: "AIzaSyBNoJim4Ii1EZxlDe0cJCM1Qw8ys55X6Co",
    authDomain: "mis-notas-c4108.firebaseapp.com",
    databaseURL: "https://mis-notas-c4108.firebaseio.com",
    projectId: "mis-notas-c4108",
    storageBucket: "mis-notas-c4108.appspot.com",
    messagingSenderId: "262928254676"
});
ReactDOM.render(<App/>, document.getElementById('root'));
serviceWorker();
