import { ReactNode, ButtonHTMLAttributes, ChangeEvent } from 'react';
import { Props } from 'react-modal';

export type CheckBoxType = ChangeEvent<HTMLInputElement>;

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	isOutlined?: boolean
};

export interface QuestionProps {
	content: string;
	author: {
		name: string;
		avatar: string;
	}
	children?: ReactNode;
	isAnswered?: boolean;
	isHighLighted?: boolean;
};

export type ModalProps = Props & {
    title: string;
    subTitle: string;
    buttonLabel?: string;
    callback: () => void;
    closeModal: () => void;
    image?: 'trash' | 'x-circle'
}
