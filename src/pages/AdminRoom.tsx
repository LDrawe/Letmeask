import { useNavigate, useParams } from 'react-router-dom';

// import useAuth from '../hooks/useAuth';
import Button from '../components/Button';
import RoomCode from '../components/RoomCode';
import Question from '../components/Question';

import useRoom from '../hooks/useRoom';
import { RoomParamsType } from '../types/Room';

import logo from '../assets/images/logo.svg';
import deleteimg from '../assets/images/delete.svg';
import '../styles/room.scss';
import { ref, remove, update } from '@firebase/database';
import { database } from '../services/firebase';

export default function AdminRoom () {
	const { id } = useParams() as RoomParamsType;
	const navigation = useNavigate();

	// const { user } = useAuth();

	const { questions, title } = useRoom(id);

	function handleDeleteQuestion (questionID: string) {
		if (confirm('Tem certeza que deseja deletar esta pergunta ?')) {
			const questionRef = ref(database, `rooms/${id}/questions/${questionID}`);
			remove(questionRef);
		}
	}

	function endRoom () {
		if (confirm('Tem certeza que deseja encerrar esta sala ?')) {
			const roomRef = ref(database, `rooms/${id}`);
			update(roomRef, {
				endedAt: Date.now()
			});
			navigation('/');
		}
	}

	return (
		<div id="page-room">
			<header>
				<div className="content">
					<img src={logo} alt="Logo" />
					<div>
						<RoomCode code={id} />
						<Button
							title="Encerrar Sala"
							onClick={endRoom}
							isOutlined
						/>
					</div>
				</div>
			</header>

			<main>
				<div className="room-title">
					<h1>Sala {title}</h1>
					<span>{questions.length} pergunta{questions.length === 1 ? '' : 's'}</span>
				</div>
				<div className="question-list">
					{questions.map(question => (
						<Question
							key={question.id}
							content={question.content}
							author={question.author}
						>
							<button
								type="button"
								onClick={() => handleDeleteQuestion(question.id)}
							>
								<img src={deleteimg} />
							</button>
						</Question>
					))}
				</div>
			</main>
		</div>
	);
}