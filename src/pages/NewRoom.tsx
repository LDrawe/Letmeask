import { Link } from 'react-router-dom';
import Button from '../components/Button';

import illustration from '../assets/images/illustration.svg';
import logo from '../assets/images/logo.svg';
import '../styles/auth.scss';
import useAuth from '../hooks/useAuth';

export default function NewRoom () {
	const { user, signInWithGoogle } = useAuth();
	console.log(user, signInWithGoogle);

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
					<form>
						<input
							type="text"
							placeholder="Nome da sala"
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
