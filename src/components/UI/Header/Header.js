import styles from './Header.module.css';

const Header = () => {
	return (
		<header className={styles.header}>
			<nav>
				<ul>
					<li>
						<a href="#">Cryptocurrencies Dashboard</a>
					</li>
					<li>
						<a href="#">Observed</a>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;
