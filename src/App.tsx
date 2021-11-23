import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Home, NewRoom, Room, AdminRoom } from './pages';

import AuthContextProvider from './contexts/AuthContext';

export default function App () {
	const defaultTheme = localStorage.getItem('@letmeask:darkMode');

    if (defaultTheme === 'true') {
        document.documentElement.setAttribute('data-theme', 'dark');
    }

	return (
		<BrowserRouter>
			<AuthContextProvider>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/rooms/new" element={<NewRoom />} />

					<Route path="/rooms/:roomID" element={<Room />} />
					<Route path="/admin/rooms/:roomID" element={<AdminRoom />} />
				</Routes>
			</AuthContextProvider>
		</BrowserRouter>
	);
}