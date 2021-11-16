import { ReactNode } from 'react';

export interface QuestionProps {
	content: string;
	author: {
		name: string;
		avatar: string;
	}
	children?: ReactNode
};