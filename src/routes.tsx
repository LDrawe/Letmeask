import { BrowserRouter, Route, Routes as Router } from 'react-router-dom';

import Home from './pages/Home';
import NewRoom from './pages/NewRoom';

import AuthContextProvider from './contexts/AuthContext';

export default function Routes () {
	return (
		<BrowserRouter>
			<AuthContextProvider>
				<Router>
					<Route path="/" element={<Home />} />
					<Route path="/rooms/new" element={<NewRoom />} />
				</Router>
			</AuthContextProvider>
		</BrowserRouter>
	);
}