import { useContext } from 'react';
import Button from '../../UI/Button/Button';
import { ThemeContext } from '../../../context/ThemeContext';
import styles from './Cryptocurrency.module.css';
import { buttonTexts } from './buttonTexts';
import { LanguageContext } from '../../../context/LanguageContext';
import { ObservedCurrenciesContext } from '../../../context/ObservedCurrenciesContext';

const Cryptocurrency = (props) => {
	const { language } = useContext(LanguageContext);
	const { addToObserved, removeFromObserved } = buttonTexts[language];
	const { isDarkMode } = useContext(ThemeContext);
	const { observedCurrenciesIds, addCurrenciesToObserved } = useContext(ObservedCurrenciesContext);

	const toggleObserved = () => {
		addCurrenciesToObserved(props.id);
	};

	return (
		<tr className={isDarkMode ? styles.dark : styles.cryptocurrency}>
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
				<Button
					onClick={toggleObserved}
					buttonMessage={observedCurrenciesIds.has(props.id) ? removeFromObserved : addToObserved}
				/>
			</td>
		</tr>
	);
};

export default Cryptocurrency;
