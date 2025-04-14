import React from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Signup from './components/signup/signup';
import Signin from './components/signin/Signin';
import ContinueWithGoogle from './components/ContinueWithGoogle';
import Homepage from './components/homepage/Homepage';
import { UserProvider } from './contexts/UserContext';

const AppLayout = () => {
	const location = useLocation();
	const hideNavbarRoutes = ['/signup', '/signin'];

	const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

	return (
		<>
			{!shouldHideNavbar && <Navbar />}
			<Routes>
				<Route path="/" element={<Homepage />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/signin" element={<Signin />} />
				<Route path="/hello" element={<ContinueWithGoogle />} />
			</Routes>
		</>
	);
};

const App = () => {
	return (
		<UserProvider>
			<BrowserRouter>
				<AppLayout />
			</BrowserRouter>
		</UserProvider>
	);
};

export default App;
