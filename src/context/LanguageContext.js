import { createContext, useState } from 'react';

export const LanguageContext = createContext();

export const LanguageProvider = (props) => {
	const [ language, setLanguage ] = useState('EN');

	const changeLanguage = (e) => setLanguage(e.target.value);

	return <LanguageContext.Provider value={{ language, changeLanguage }}>{props.children}</LanguageContext.Provider>;
};
