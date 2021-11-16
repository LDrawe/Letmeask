export type FirebaseQuestions = Record<string, {
	author: {
		name: string;
		avatar: string;
	}
	content: string;
	isAnswered: boolean;
	isHighlighted: boolean;
	likes: Record<string, {
		authorID: string;
	}>;
}>

export type QuestionType = {
	id: string;
	author: {
		name: string;
		avatar: string;
	}
	content: string;
	isAnswered: boolean;
	isHighlighted: boolean;
	likeCount: number;
	likeID: string | undefined;
}