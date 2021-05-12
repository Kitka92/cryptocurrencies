import { useContext } from 'react';
import styles from './TableWrapper.module.css';
import { ThemeContext } from '../../../context/ThemeContext';

const TableWrapper = (props) => {
	const { isDarkMode } = useContext(ThemeContext);
	return (
		<table className={isDarkMode ? styles.dark : styles.tablewrapper}>
			<tbody>
				<tr>
					<th className={styles.tablewrapper__theads}>Icon</th>
					<th className={styles.tablewrapper__theads}>Name</th>
					<th className={styles.tablewrapper__theads}>Symbol</th>
					<th className={styles.tablewrapper__theads}>Price</th>
					<th className={styles.tablewrapper__theads}>1h change</th>
					<th className={styles.tablewrapper__theads}>24h change</th>
					<th className={styles.tablewrapper__theads}>7days change</th>
					<th />
				</tr>
				{props.children}
			</tbody>
		</table>
	);
};

export default TableWrapper;
