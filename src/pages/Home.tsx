import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, ThemeButton } from '../components';

import useAuth from '../hooks/useAuth';

import { ref, get, child } from 'firebase/database';
import { database } from '../services/firebase';

import illustration from '../assets/images/illustration.svg';
import logo from '../assets/images/logo.svg';
import google from '../assets/images/google-icon.svg';

import '../styles/auth.scss';

export default function Home () {
	const navigation = useNavigate();

	const { user, signInWithGoogle } = useAuth();

	const [roomCode, setRoomCode] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	async function createRoom () {
		if (!user) {
			await signInWithGoogle().catch(error => console.warn(error));
		}
		navigation('/rooms/new');
	}

	async function joinRoom (event: FormEvent) {
		event.preventDefault();

		if (errorMessage) {
			setErrorMessage('');
		}

		if (roomCode.trim() === '') {
			return;
		}

		const roomRef = ref(database);
		const roomCodeRef = child(roomRef, `rooms/${roomCode}`);
		get(roomCodeRef)
			.then(snapshot => {
				if (!snapshot.exists()) return setErrorMessage('Esta sala não existe');

				if (snapshot.val().endedAt) return setErrorMessage('Esta sala foi encerrada');

				navigation(`rooms/${roomCode}`);
			}).catch(error => console.warn(error));
	}

	return (
		<div id="page-auth">
			<aside className="dis">
				<img src={illustration} alt="Ilustração representando perguntas e respostas" />
				<strong>
					Crie salas de Q&amp;A Ao-Vivo
				</strong>
				<p>
					Tire as dúvidas da sua audiência em tempo real
				</p>
			</aside>
			<main>
				<div className="main-content">
					<img src={logo} alt="Letmeask" />
					<ThemeButton />
					<button className="create-room" onClick={createRoom}>
						<img src={google} alt="Google" />
						Crie sua sala com o Google
					</button>
					<div className="separator">
						ou entre em uma sala
					</div>
					<form onSubmit={joinRoom}>
						<input
							type="text"
							placeholder="Digite o código da sala"
							value={roomCode}
							onChange={event => setRoomCode(event.target.value)}
						/>
						{errorMessage && (
							<p className="error">{errorMessage}</p>
						)}
						<Button title="Entrar na sala" />
					</form>
				</div>
			</main>
		</div>
	);
}