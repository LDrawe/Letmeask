import { useNavigate, useParams } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import ReactTooltip from 'react-tooltip';
import cx from 'classnames';

import { ref, remove, update } from '@firebase/database';
import { database } from '../services/firebase';

import useRoom from '../hooks/useRoom';

import Button from '../components/Button';
import RoomCode from '../components/RoomCode';
import Question from '../components/Question';
import ThemeToggle from '../components/ThemeButton';

import { RoomParamsType } from '../types/Room';

import logo from '../assets/images/logo.svg';
import deleteimg from '../assets/images/delete.svg';
import checkimg from '../assets/images/check.svg';
import answerimg from '../assets/images/answer.svg';

import '../styles/room.scss';

export default function AdminRoom () {
	const { roomID } = useParams() as RoomParamsType;
	const navigation = useNavigate();

	const { questions, title } = useRoom(roomID);

	function deleteQuestion (questionID: string) {
		if (confirm('Tem certeza que deseja deletar esta pergunta ?')) {
			const questionRef = ref(database, `rooms/${roomID}/questions/${questionID}`);
			remove(questionRef);
		}
	}

	function highLightQuestion (questionID: string, questionBool: boolean) {
		const questionRef = ref(database, `rooms/${roomID}/questions/${questionID}`);
		update(questionRef, {
			isHighLighted: !questionBool
		});
	}

	function markQuestionAsAnswered (questionID: string) {
		const questionRef = ref(database, `rooms/${roomID}/questions/${questionID}`);
		update(questionRef, {
			isAnswered: true
		});
	}

	function endRoom () {
		if (confirm('Tem certeza que deseja encerrar esta sala ?')) {
			const roomRef = ref(database, `rooms/${roomID}`);
			update(roomRef, {
				endedAt: Date.now()
			});
			navigation('/');
		}
	}

	return (
		<div id="page-room">
			<Toaster position="top-center" />
			<header>
				<div className="content">
					<img src={logo} alt="Logo" />
					<div>
						<ThemeToggle />
						<Button
							title="Encerrar Sala"
							onClick={endRoom}
							isOutlined
						/>
						<RoomCode code={roomID} />
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
							isAnswered={question.isAnswered}
							isHighLighted={question.isHighLighted}
						>
							{!question.isAnswered && (
								<>
									<button
										type="button"
										onClick={() => markQuestionAsAnswered(question.id)}
										data-tip="Marcar pergunta como respondida"
										data-delay-show="300"
									>
										<img src={checkimg} alt="Marcar pergunta como respondida" />
										<ReactTooltip />
									</button>
									<button
										type="button"
										className={cx('',
											{ highlighted: question.isHighLighted && !question.isAnswered }
										)}
										onClick={() => highLightQuestion(question.id, question.isHighLighted)}
										data-tip="Destacar pergunta"
										data-delay-show="300"
									>
										<img src={answerimg} alt="Destacar pergunta" />
										<ReactTooltip />
									</button>
								</>)}
							<button
								type="button"
								onClick={() => deleteQuestion(question.id)}
								data-tip="Deletar pergunta"
								data-delay-show="300"
							>
								<img src={deleteimg} alt="Deletar pergunta" />
								<ReactTooltip />
							</button>
						</Question>
					))}
				</div>
			</main>
		</div>
	);
}