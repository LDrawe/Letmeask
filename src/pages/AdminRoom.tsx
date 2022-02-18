import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import ReactTooltip from 'react-tooltip';
import cx from 'classnames';

import { ref, update, remove } from '@firebase/database';
import { database } from '../services/firebase';

import useRoom from '../hooks/useRoom';

import { Button, Modal, ThemeButton, Question, RoomCode } from '../components';

import { RoomParamsType } from '../types/Room';

import logo from '../assets/images/logo.svg';
import deleteimg from '../assets/images/delete.svg';
import checkimg from '../assets/images/check.svg';
import empty from '../assets/images/empty-questions.svg';
import '../styles/room.scss';

export default function AdminRoom () {
	const { roomID } = useParams() as RoomParamsType;
	const navigation = useNavigate();

	const [isOpen, setIsOpen] = useState(false);
	const [endRoomModal, setEndRoomModal] = useState(false);

	const { questions, title } = useRoom(roomID);

	const [modalQuestionID, setModalQuestionID] = useState('');

	function deleteQuestion (questionID: string) {
		const questionRef = ref(database, `rooms/${roomID}/questions/${questionID}`);
		remove(questionRef);
		setIsOpen(false);
	}

	function handleDelete (questionID: string) {
		setModalQuestionID(questionID);
		setIsOpen(true);
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

	function openEndRoomModal () {
		setEndRoomModal(true);
	}

	function endRoom () {
		const roomRef = ref(database, `rooms/${roomID}`);
		update(roomRef, {
			endedAt: Date.now()
		});
		navigation('/');
	}

	return (
		<div id="page-room">
			<Toaster position="top-center" />
			<Modal
				title="Excluir pergunta"
				subTitle="Tem certeza que deseja excluir esta pergunta ?"
				callback={() => {
					console.log(modalQuestionID);
					deleteQuestion(modalQuestionID);
				}}
				isOpen={isOpen}
				closeModal={() => setIsOpen(false)}
				ariaHideApp={false}
			/>
			<Modal
				title="Encerrar Sala"
				subTitle="Tem certeza que deseja encerrar esta sala ?"
				callback={endRoom}
				isOpen={endRoomModal}
				closeModal={() => setEndRoomModal(false)}
				ariaHideApp={false}
			/>
			<header>
				<div className='header-buttons'>
					<img src={logo} alt="Logo" />
					<ThemeButton />
				</div>
				<div className='control-buttons'>
					<Button
						title="Encerrar Sala"
						onClick={openEndRoomModal}
						isOutlined
					/>
					<RoomCode code={roomID} />
				</div>
			</header>

			<main>
				<div className="room-title">
					<h1>Sala {title}</h1>
					<span>{questions.length} pergunta{questions.length === 1 ? '' : 's'}</span>
				</div>
				<div className="question-list">
					{questions.length > 0
						? questions.map(question => (
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
											<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path fillRule="evenodd" clipRule="evenodd" d="M12 17.9999H18C19.657 17.9999 21 16.6569 21 14.9999V6.99988C21 5.34288 19.657 3.99988 18 3.99988H6C4.343 3.99988 3 5.34288 3 6.99988V14.9999C3 16.6569 4.343 17.9999 6 17.9999H7.5V20.9999L12 17.9999Z" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
											</svg>
											<ReactTooltip />
										</button>
									</>)}
								<button
									type="button"
									onClick={() => handleDelete(question.id)}
									data-tip="Deletar pergunta"
									data-delay-show="300"
								>
									<img src={deleteimg} alt="Deletar pergunta" />
									<ReactTooltip />
								</button>
							</Question>
						))
						: <div className='empty'>
							<img src={empty} />
							<h3>Nenhuma pergunta por aqui</h3>
							<p>
								Envie o código dessa sala para seus amigos e comece a responder perguntas
							</p>
						</div>
					}
				</div>
			</main>
		</div>
	);
}