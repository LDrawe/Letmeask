import Routes from './routes';

export default function App () {
	const defaultTheme = localStorage.getItem('@letmeask:darkMode');

    if (defaultTheme === 'true') {
        document.documentElement.setAttribute('data-theme', 'dark');
    }

	return (
		<Routes />
	);
}