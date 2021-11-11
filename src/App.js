import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { addDoc, deleteDoc, doc } from 'firebase/firestore';
import { CHARACTERS } from './constants/characters';

const initialState = { name: '', appearance: '' };

function App({ charactersRef, db }) {
	const [state, setState] = useState(initialState);
	const [id, setId] = useState('');

	const onChangeHandler = (e) => setState({ ...state, [e.target.name]: e.target.value });
	const onClickHandler = async (e) => {
		e.preventDefault();
		try {
			await addDoc(charactersRef, state);
			setState(initialState);
		} catch (error) {
			console.log(error);
		}
	};

	const onChangedIdHandler = (e) => {
		setId(e.target.value);
	};

	const onDeleteHandler = async (e) => {
		e.preventDefault();
		const docRef = doc(db, CHARACTERS, id);

		try {
			await deleteDoc(docRef);
			setId('');
		} catch (error) {
			console.log(error);
		}
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
					<input
						type="text"
						name="name"
						value={state.name}
						required
						onChange={(e) => onChangeHandler(e)}
					/>
					<label htmlFor="name">Appearance:</label>
					<input
						type="text"
						name="appearance"
						value={state.appearance}
						required
						onChange={(e) => onChangeHandler(e)}
					/>
					<button onClick={(e) => onClickHandler(e)}>Add New Characters</button>
				</form>
			</section>
			<section>
				<form className="add">
					<label htmlFor="id">Id:</label>
					<input
						type="text"
						name="id"
						value={id}
						required
						onChange={(e) => onChangedIdHandler(e)}
					/>
					<button onClick={(e) => onDeleteHandler(e)}>Delete</button>
				</form>
			</section>
		</div>
	);
}

export default App;
