import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

import { ref, get, child } from 'firebase/database';
import { database } from '../services/firebase';

import useAuth from '../hooks/useAuth';

import illustration from '../assets/images/illustration.svg';
import logo from '../assets/images/logo.svg';
import google from '../assets/images/google-icon.svg';
import '../styles/auth.scss';

export default function Home () {
	const navigation = useNavigate();
	const { user, signInWithGoogle } = useAuth();

	const [roomCode, setRoomCode] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	async function handleCreateRoom () {
		if (!user) {
			await signInWithGoogle().catch(error => console.log(error));
		}
		navigation('/rooms/new');
	}

	async function handleJoinRoom (event: FormEvent) {
		event.preventDefault();

		if (errorMessage) {
			setErrorMessage('');
		}

		if (roomCode.trim() === '') {
			return;
		}

		const roomRef = ref(database);
		get(child(roomRef, `rooms/${roomCode}`))
			.then(snapshot => {
				if (!snapshot.exists()) {
					setErrorMessage('Esta sala não existe');
					return;
				}
				navigation(`rooms/${roomCode}`);
			}).catch(error => console.log(error));
	}

	return (
		<div id="page-auth">
			<aside>
				<img src={illustration} alt="Ilustração representando perguntas e respostas" />
				<strong>
					Crie salas de Q&amp;A ao-vivo
				</strong>
				<p>
					Tire as dúvidas da sua audiência em tempo real
				</p>
			</aside>
			<main>
				<div className="main-content">
					<img src={logo} alt="Letmeask" />
					<button className="create-room" onClick={handleCreateRoom}>
						<img src={google} alt="Google" />
						Crie sua sala com o Google
					</button>
					<div className="separator">
						ou entre em uma sala
					</div>
					<form onSubmit={handleJoinRoom}>
						<input
							type="text"
							placeholder="Digite o código da sala"
							value={roomCode}
							onChange={event => setRoomCode(event.target.value)}
						/>
						<Button title="Entrar na sala" />
						{errorMessage && <p className="error">{errorMessage}</p>}
					</form>
				</div>
			</main>
		</div>
	);
}