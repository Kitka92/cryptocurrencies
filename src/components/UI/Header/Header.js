import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { ThemeContext } from '../../../context/ThemeContext';
import styles from './Header.module.css';

const Header = () => {
	const { isDarkMode, toggleTheme } = useContext(ThemeContext);

	return (
		<header className={isDarkMode ? styles.header__dark : styles.header}>
			<nav>
				<NavLink className={styles.header__link} exact to="/">
					Cryptocurrencies Dashboard
				</NavLink>
				<NavLink className={styles.header__link} exact to="/observed">
					Observed
				</NavLink>
				<span>Language:</span>
				<label className={styles.switch}>
					<input value={isDarkMode} type="checkbox" onChange={toggleTheme} />
					<span className={`${styles.slider} ${styles.round}`} />
				</label>
			</nav>
		</header>
	);
};

export default Header;
