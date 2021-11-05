import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

import useAuth from '../hooks/useAuth';

import illustration from '../assets/images/illustration.svg';
import logo from '../assets/images/logo.svg';
import google from '../assets/images/google-icon.svg';
import '../styles/auth.scss';

export default function Home () {
	const navigation = useNavigate();
	const { user, signInWithGoogle } = useAuth();

	async function handleCreateRoom () {
		if (!user) {
			await signInWithGoogle();
		}
		navigation('/rooms/new');
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
					<form>
						<input
							type="text"
							placeholder="Digite o código da sala"
						/>
						<Button title="Entrar na sala" />
					</form>
				</div>
			</main>
		</div>
	);
}