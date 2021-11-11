import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
	const [state, setState] = useState({});

	const onChangeHandler = (e) => setState({ ...state, [e.target.name]: e.target.value });
	const onClickHandler = (e) => {
		e.preventDefault();
		console.log(state);
	};

	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<h1>Getting Started with Firebase</h1>
			</header>
			<section>
				<h2>Firebase Firestore</h2>
				<form className="add">
					<label htmlFor="name">Name:</label>
					<input type="text" name="name" required onChange={(e) => onChangeHandler(e)} />
					<label htmlFor="name">Appearance:</label>
					<input type="text" name="appearance" required onChange={(e) => onChangeHandler(e)} />
					<button onClick={(e) => onClickHandler(e)}>Add New Characters</button>
				</form>
			</section>
		</div>
	);
}

export default App;
