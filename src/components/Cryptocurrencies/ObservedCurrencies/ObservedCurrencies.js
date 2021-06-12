import { useContext } from 'react';
import TableWrapper from '../../UI/TableWrapper/TableWrapper';
import Cryptocurrency from '../Cryptocurrency/Cryptocurrency';
import Container from '../../UI/Container/Container';
import styles from './ObservedCurrencies.module.css';
import { ThemeContext } from '../../../context/ThemeContext';
import { ObservedCurrenciesContext } from '../../../context/ObservedCurrenciesContext';

const ObservedCurrencies = (props) => {
	const { isDarkMode } = useContext(ThemeContext);
	const { observedCurrenciesIds } = useContext(ObservedCurrenciesContext);

	const observedCurrencies = props.observableCurrencies.filter((currency) => observedCurrenciesIds.has(currency.id));

	const currenciesToDisplay = observedCurrencies.map((currency) => (
		<Cryptocurrency key={currency.id} {...currency} />
	));

	if (currenciesToDisplay.length === 0) {
		return (
			<p
				className={
					isDarkMode ? `${styles.dark} ${styles.observedCurrencies__none}` : styles.observedCurrencies__none
				}
			>
				Currently you don't observe any cryptocurrency.
			</p>
		);
	}

	return (
		<div className={isDarkMode ? `${styles.dark} ${styles.dark__fullSize}` : null}>
			<Container>
				<TableWrapper>{currenciesToDisplay}</TableWrapper>
			</Container>
		</div>
	);
};

export default ObservedCurrencies;
