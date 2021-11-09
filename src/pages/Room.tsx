import { useState, FormEvent, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ref, push, onValue } from 'firebase/database';
import { database } from '../services/firebase';

import useAuth from '../hooks/useAuth';
import Button from '../components/Button';
import RoomCode from '../components/RoomCode';

import { Question, FirebaseQuestions } from '../types/Firebase';
import { RoomParamsType } from '../types/Room';

import logo from '../assets/images/logo.svg';
import '../styles/room.scss';

export default function Room () {
	const navigation = useNavigate();
	const { id } = useParams() as RoomParamsType;
	const [title, setTitle] = useState('');

	const [newQuestion, setNewQuestion] = useState('');
	const [questions, setQuestions] = useState<Question[]>([]);

	const { user } = useAuth();

	useEffect(() => {
		const roomref = ref(database, `rooms/${id}`);
		onValue(roomref, room => {
			const databaseRoom = room.val();
			if (!databaseRoom) {
				return navigation('/');
			}
			setTitle(databaseRoom.roomTitle);
			if (databaseRoom.questions) {
				const questions = databaseRoom.questions as FirebaseQuestions;
				const parsedQuestions = Object.entries(questions).map(([key, value]) => ({
					id: key,
					content: value.content,
					author: value.author,
					isAnswered: value.isAnswered,
					isHighlighted: value.isHighlighted
				}));
				setQuestions(parsedQuestions);
			}
		}, {
			onlyOnce: true
		});
	}, [id]);

	async function handleSendQuestion (event: FormEvent) {
		event.preventDefault();

		if (!user) {
			throw new Error('You\'re not supposed to be here');
		}

		if (newQuestion.trim() === '') {
			return;
		}

		const question = {
			content: newQuestion,
			author: {
				name: user.name,
				avatar: user.avatar
			},
			isHighlighted: false,
			isAnswered: false
		};

		const questionID: string | null = push(ref(database, `rooms/${id}/questions`), question).key;

		setNewQuestion('');

		if (questionID) {
			setQuestions(oldValue => [...oldValue, { ...question, id: questionID }]);
		}
	}

	return (
		<div id="page-room">
			<header>
				<div className="content">
					<img src={logo} alt="Logo" />
					<RoomCode code={id} />
				</div>
			</header>

			<main>
				<div className="room-title">
					<h1>Sala {title}</h1>
					<span>{questions.length} pergunta{questions.length === 1 ? '' : 's'}</span>
				</div>
				<form onSubmit={handleSendQuestion}>
					<textarea
						placeholder="Qual sua pergunta ?"
						value={newQuestion}
						onChange={event => setNewQuestion(event.target.value)}
					/>
					<div className="form-footer">
						{user
							? <div className="user-info">
								<img src={user.avatar} alt={user.name} />
								<span>{user.name}</span>
							</div>
							: <span>Para enviar uma pergunta,&ensp;<button>faça seu login</button>.</span>
						}
						<Button type="submit" title="Enviar Pergunta" disabled={!user} />
					</div>
				</form>
				{console.table(questions)}
			</main>
		</div>
	);
}