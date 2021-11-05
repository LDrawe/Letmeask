import { useState, useEffect, createContext } from 'react';

import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../services/firebase';

import UserType from '../types/User';
import { AuthContextType, AuthContextProps } from '../types/AuthContext';

export const AuthContext = createContext({} as AuthContextType);

export default function AuthContextProvider (props: AuthContextProps) {
	const [user, setUser] = useState<UserType>();

	async function signInWithGoogle () {
		try {
			const provider = new GoogleAuthProvider();
			const result = await signInWithPopup(auth, provider);
			if (result.user) {
				const { displayName, uid, photoURL } = result.user;

				if (!displayName || !photoURL) {
					throw new Error('Missing information from Google Acount');
				}

				setUser({
					id: uid,
					name: displayName,
					avatar: photoURL
				});
			}
		} catch (error) {
			console.log(error);
		}
	}
	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(user => {
			if (user) {
				const { displayName, uid, photoURL } = user;

				if (!displayName || !photoURL) {
					throw new Error('Missing information from Google Acount');
				}

				setUser({
					id: uid,
					name: displayName,
					avatar: photoURL
				});
			}
		});

		return () => {
			unsubscribe();
		};
	}, []);

	return (
		<AuthContext.Provider value={{ user, signInWithGoogle }}>
			{props.children}
		</AuthContext.Provider>
	);
}
