import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { CHARACTERS } from './constants/characters';

const firebaseConfig = {
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_PROJECT_ID,
	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGE_SENDER_ID,
	appId: process.env.REACT_APP_APP_ID,
};

// Initialize Firebase
initializeApp(firebaseConfig);

// Initialize Firebase Services
const db = getFirestore();

// Collection reference
const charactersRef = collection(db, CHARACTERS);

// Getting the Collection Data
getDocs(charactersRef)
	.then((snapshot) => {
		let characters = [];
		snapshot.docs.forEach((doc) => {
			characters.push({ ...doc.data(), id: doc.id });
		});
		console.log(characters);
	})
	.catch((error) => console.log(error));

ReactDOM.render(
	<React.StrictMode>
		<App charactersRef={charactersRef} db={db} />
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
