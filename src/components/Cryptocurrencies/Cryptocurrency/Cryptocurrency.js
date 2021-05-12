import { useContext } from 'react';
import Button from '../../UI/Button/Button';
import { ThemeContext } from '../../../context/ThemeContext';
import styles from './Cryptocurrency.module.css';

const Cryptocurrency = (props) => {
	const toggleObserved = () => {
		props.toggleObserved(props.id);
	};

	let buttonMsg = 'Add to observed';
	if (props.isObserved) {
		buttonMsg = 'Remove from observed';
	}
	const { isDarkMode } = useContext(ThemeContext);
	return (
		<tr className={isDarkMode ? styles.dark : styles.cryptocurrency}>
			{/* <tr className={styles.cryptocurrency}> */}
			<td>
				<img alt={`${props.name} icon`} src={`${props.icon}`} />
			</td>
			<td>{props.name}</td>
			<td>{props.symbol}</td>
			<td>$ {Math.round((props.price + Number.EPSILON) * 100) / 100}</td>
			<td>{Math.round((props.oneHourChange + Number.EPSILON) * 100) / 100} %</td>
			<td>{Math.round((props.oneDayChange + Number.EPSILON) * 100) / 100} %</td>
			<td>{Math.round((props.sevenDaysChange + Number.EPSILON) * 100) / 100} %</td>
			<td>
				<Button onClick={toggleObserved} buttonMessage={buttonMsg} />
			</td>
		</tr>
	);
};

export default Cryptocurrency;
