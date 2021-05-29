import { useContext } from 'react';
import styles from './TableWrapper.module.css';
import { ThemeContext } from '../../../context/ThemeContext';
import { LanguageContext } from '../../../context/LanguageContext';
import { tableHeaders } from './tableHeaders';

const TableWrapper = (props) => {
	const { isDarkMode } = useContext(ThemeContext);
	const { language } = useContext(LanguageContext);
	const { icon, name, symbol, price, oneHourChange, twentyFourHoursChange, sevenDaysChange } = tableHeaders[language];

	return (
		<table className={isDarkMode ? styles.dark : styles.tablewrapper}>
			<tbody>
				<tr>
					<th className={styles.tablewrapper__theads}>{icon}</th>
					<th className={styles.tablewrapper__theads}>{name}</th>
					<th className={styles.tablewrapper__theads}>{symbol}</th>
					<th className={styles.tablewrapper__theads}>{price}</th>
					<th className={styles.tablewrapper__theads}>{oneHourChange}</th>
					<th className={styles.tablewrapper__theads}>{twentyFourHoursChange}</th>
					<th className={styles.tablewrapper__theads}>{sevenDaysChange}</th>
					<th />
				</tr>
				{props.children}
			</tbody>
		</table>
	);
};

export default TableWrapper;
