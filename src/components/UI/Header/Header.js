import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
	return (
		<header className={styles.header}>
			<nav>
				<NavLink className={styles.header__link} exact to="/">
					Cryptocurrencies Dashboard
				</NavLink>
				<NavLink className={styles.header__link} exact to="/observed">
					Observed
				</NavLink>
			</nav>
		</header>
	);
};

export default Header;
