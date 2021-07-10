import { createContext } from 'react';
import { getDataFromLocalStorage } from '../helpers/localStorageFinder';
import useToggleState from '../hooks/useToggleState';

export const ThemeContext = createContext();

const theme = 'isDarkMode';

export const ThemeProvider = (props) => {
	const getThemeFromLocalStorage = () => {
		if (getDataFromLocalStorage(theme) === null) {
			return false;
		}
		return JSON.parse(getDataFromLocalStorage(theme));
	};

	const [ isDarkMode, toggleTheme ] = useToggleState(getThemeFromLocalStorage());

	const saveThemeInLocalStorage = () => {
		localStorage.setItem(theme, isDarkMode);
	};

	return (
		<ThemeContext.Provider value={{ isDarkMode, toggleTheme, saveThemeInLocalStorage }}>
			{props.children}
		</ThemeContext.Provider>
	);
};
