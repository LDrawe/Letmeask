import { ReactNode } from 'react';
import UserType from './User';

export interface AuthContextType {
	user: UserType | undefined;
	signInWithGoogle: () => Promise<void>;
}

export interface AuthContextProps {
	children: ReactNode
};