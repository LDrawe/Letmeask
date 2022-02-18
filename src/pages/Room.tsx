import { useState, FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { ref, push, remove } from 'firebase/database';
import { database } from '../services/firebase';

import useAuth from '../hooks/useAuth';
import useRoom from '../hooks/useRoom';

import { Button, RoomCode, Question, ThemeButton } from '../components';

import { RoomParamsType } from '../types/Room';

import logo from '../assets/images/logo.svg';

import '../styles/room.scss';

export default function Room () {
	const navigation = useNavigate();
	const { roomID } = useParams() as RoomParamsType;

	const [newQuestion, setNewQuestion] = useState('');
	const [posting, setPosting] = useState(false);

	const { user } = useAuth();
	const { questions, title } = useRoom(roomID);

	async function sendQuestion (event: FormEvent) {
		event.preventDefault();

		if (!user) {
			throw new Error('Você não está logado');
		}

		if (newQuestion.trim() !== '') {
			setPosting(true);
			const question = {
				content: newQuestion,
				author: {
					name: user.name,
					avatar: user.avatar
				},
				isHighLighted: false,
				isAnswered: false
			};

			const questionsRef = ref(database, `rooms/${roomID}/questions`);
			push(questionsRef, question).catch(error => console.warn(error));
			setPosting(false);
		}

		setNewQuestion('');
	}

	async function likeQuestion (questionID: string, likeID: string | undefined) {
		if (likeID) {
			const likeRef = ref(database, `rooms/${roomID}/questions/${questionID}/likes/${likeID}`);
			remove(likeRef);
		} else {
			const likesRef = ref(database, `rooms/${roomID}/questions/${questionID}/likes`);
			push(likesRef, {
				authorID: user?.id
			}).catch(error => console.log(error));
		}
	}

	return (
		<div id="page-room">
			<Toaster />
			<header>
				<div className='header-buttons'>
					<img src={logo} alt="Logo" />
					<ThemeButton />
				</div>
				<div className='control-buttons'>
					<Button
						title="Sair"
						onClick={() => navigation('/')}
						isOutlined
					/>
					<RoomCode code={roomID} />
				</div>
			</header>

			<main>
				<div className="room-title">
					<h1>
						Sala {title}
					</h1>
					<span>
						{questions.length} pergunta{questions.length === 1 ? '' : 's'}
					</span>
				</div>
				<form onSubmit={sendQuestion}>
					<textarea
						placeholder="Qual sua pergunta ?"
						value={newQuestion}
						onChange={event => setNewQuestion(event.target.value)}
					/>
					<div className="form-footer">
						{user
							? <div className="user-info">
								<img src={user.avatar} alt="Foto de Perfil" />
								<span>
									{user.name}
								</span>
							</div>
							: (
								<span>
									Para enviar uma pergunta,&ensp;<button>faça seu login</button>.
								</span>
							)
						}
						<Button type="submit" title={posting ? 'Enviando ...' : 'Enviar Pergunta'} disabled={!user} />
					</div>
				</form>
				<div className="question-list">
					{questions.map(question => (
						<Question
							key={question.id}
							content={question.content}
							author={question.author}
							isAnswered={question.isAnswered}
							isHighLighted={question.isHighLighted}
						>
							<div className={`like-button-container ${question.likeID ? 'liked' : ''}`}>
								<span>
									{question.likeCount}
								</span>
								<button
									className={`like-button ${question.likeID ? 'liked' : ''}`}
									type="button"
									aria-label="Marcar como gostei"
									onClick={() => likeQuestion(question.id, question.likeID)}
									disabled={question.isAnswered}
								>
									<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M7 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V13C2 12.4696 2.21071 11.9609 2.58579 11.5858C2.96086 11.2107 3.46957 11 4 11H7M14 9V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2L7 11V22H18.28C18.7623 22.0055 19.2304 21.8364 19.5979 21.524C19.9654 21.2116 20.2077 20.7769 20.28 20.3L21.66 11.3C21.7035 11.0134 21.6842 10.7207 21.6033 10.4423C21.5225 10.1638 21.3821 9.90629 21.1919 9.68751C21.0016 9.46873 20.7661 9.29393 20.5016 9.17522C20.2371 9.0565 19.9499 8.99672 19.66 9H14Z" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
									</svg>
								</button>
							</div>
						</Question>
					))}
				</div>
			</main>
		</div>
	);
}