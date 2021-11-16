import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

import Button from '../components/Button';

import { ref, push } from 'firebase/database';
import { database } from '../services/firebase';

import illustration from '../assets/images/illustration.svg';
import logo from '../assets/images/logo.svg';
import '../styles/auth.scss';

export default function NewRoom () {
	const { user } = useAuth();
	const navigation = useNavigate();
	const [newRoom, setNewRoom] = useState('');

	async function handleCreateNewRoom (event: FormEvent) {
		event.preventDefault();

		if (newRoom.trim() === '') {
			return;
		}

		setNewRoom('');
		const firebaseRoom = push(ref(database, 'rooms'), {
			roomTitle: newRoom,
			authorID: user?.id
		}).key;
		navigation(`/rooms/${firebaseRoom}`);
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
					<h2>
						Criar uma nova sala
					</h2>
					<form onSubmit={handleCreateNewRoom}>
						<input
							type="text"
							placeholder="Nome da sala"
							value={newRoom}
							onChange={event => setNewRoom(event.target.value)}
						/>
						<Button title="Criar Sala" />
					</form>
					<p>
						Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link>
					</p>
				</div>
			</main>
		</div>
	);
}
