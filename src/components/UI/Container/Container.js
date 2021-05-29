import styles from './Container.module.css';
import { useContext } from 'react';
import { ThemeContext } from '../../../context/ThemeContext';

const Container = (props) => {
	const { isDarkMode } = useContext(ThemeContext);
	return <div className={isDarkMode ? `${styles.container} ${styles.dark}` : styles.container}>{props.children}</div>;
};

export default Container;
