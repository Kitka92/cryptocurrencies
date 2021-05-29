import { useContext } from 'react';
import TableWrapper from '../../UI/TableWrapper/TableWrapper';
import Cryptocurrency from '../Cryptocurrency/Cryptocurrency';
import Container from '../../UI/Container/Container';
import styles from './ObservedCurrencies.module.css';
import toggleObserved from '../../../helpers/toggleObserved';
import { ThemeContext } from '../../../context/ThemeContext';

const ObservedCurrencies = (props) => {
	const { isDarkMode } = useContext(ThemeContext);

	const setObserved = toggleObserved(props.observableCurrencies, props.setCurrencies);

	const observedCurrencies = props.observableCurrencies.filter((currency) => currency.isObserved === true);

	const currenciesToDisplay = observedCurrencies.map((currency) => (
		<Cryptocurrency
			key={currency.id}
			id={currency.id}
			name={currency.name}
			icon={currency.icon}
			isObserved={currency.isObserved}
			symbol={currency.symbol}
			price={currency.quote.USD.price}
			oneHourChange={currency.quote.USD.percent_change_1h}
			oneDayChange={currency.quote.USD.percent_change_24h}
			sevenDaysChange={currency.quote.USD.percent_change_7d}
			toggleObserved={setObserved}
		/>
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
