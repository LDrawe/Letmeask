import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { onValue, ref } from 'firebase/database';
import { database } from '../services/firebase';

import useAuth from './useAuth';

import { QuestionType, FirebaseQuestions } from '../types/Firebase';

export default function useRoom (roomID: string) {
	const navigation = useNavigate();
	const { user } = useAuth();
	const [title, setTitle] = useState('');

	const [questions, setQuestions] = useState<QuestionType[]>([]);

	useEffect(() => {
		const roomRef = ref(database, `rooms/${roomID}`);
		const unsubscribeRoomListener = onValue(roomRef, room => {
			const databaseRoom = room.val();

			if (!databaseRoom) {
				return navigation('/');
			}

			setTitle(databaseRoom.roomTitle);
			if (databaseRoom.questions) {
				const questions: FirebaseQuestions = databaseRoom.questions;
				const parsedQuestions = Object.entries(questions).map(([key, value]) => ({
					id: key,
					content: value.content,
					author: value.author,
					isAnswered: value.isAnswered,
					isHighLighted: value.isHighLighted,
					likeCount: Object.values(value.likes ?? {}).length,
					likeID: Object.entries(value.likes ?? {}).find(([key, value]) => value.authorID === user?.id)?.[0]
				}));
				setQuestions(parsedQuestions);
			}
		});

		return unsubscribeRoomListener;
	}, [roomID, user?.id]);

	return { questions, title };
}
