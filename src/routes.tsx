import { BrowserRouter, Route, Routes as Router } from 'react-router-dom';

import Home from './pages/Home';
import NewRoom from './pages/NewRoom';

import AuthContextProvider from './contexts/AuthContext';
import Room from './pages/Room';
import AdminRoom from './pages/AdminRoom';

export default function Routes () {
	return (
		<BrowserRouter>
			<AuthContextProvider>
				<Router>
					<Route path="/" element={<Home />} />
					<Route path="/rooms/new" element={<NewRoom />} />

					<Route path="/rooms/:roomID" element={<Room />} />
					<Route path="/admin/rooms/:roomID" element={<AdminRoom />} />
				</Router>
			</AuthContextProvider>
		</BrowserRouter>
	);
}