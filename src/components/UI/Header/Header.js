import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { ThemeContext } from '../../../context/ThemeContext';
import styles from './Header.module.css';
import { useEffect } from 'react';
import { LanguageContext } from '../../../context/LanguageContext';
import { navLinks } from './navLinks';

const Header = () => {
	const { isDarkMode, toggleTheme, saveThemeInLocalStorage } = useContext(ThemeContext);
	const { language, changeLanguage } = useContext(LanguageContext);
	const { cryptocurrenciesDashboard, observed } = navLinks[language];

	useEffect(
		() => {
			saveThemeInLocalStorage();
		},
		[ isDarkMode ]
	);

	console.log(typeof isDarkMode);

	return (
		<header className={isDarkMode ? styles.header__dark : styles.header}>
			<nav>
				<NavLink className={styles.header__link} exact to="/">
					{cryptocurrenciesDashboard}
				</NavLink>
				<NavLink className={styles.header__link} exact to="/observed">
					{observed}
				</NavLink>
				<select value={language} onChange={changeLanguage}>
					<option>EN</option>
					<option>PL</option>
				</select>
				<label className={styles.switch}>
					<input checked={isDarkMode} value={isDarkMode} type="checkbox" onChange={toggleTheme} />
					<span className={`${styles.slider} ${styles.round}`} />
				</label>
			</nav>
		</header>
	);
};

export default Header;
