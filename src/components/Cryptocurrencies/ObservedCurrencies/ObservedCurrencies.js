import TableWrapper from '../../UI/TableWrapper/TableWrapper';
import Cryptocurrency from '../Cryptocurrency/Cryptocurrency';
import Container from '../../UI/Container/Container';
import styles from './ObservedCurrencies.module.css';

const ObservedCurrencies = (props) => {
	const observedCurrencies = props.observableCurrencies.filter((currency) => currency.isObserved === true);
	const currenciestoDisplay = observedCurrencies.map((currency) => (
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
			toggleObserved={props.toggleObserved}
		/>
	));

	if (currenciestoDisplay.length === 0) {
		return <p className={styles.observedCurrencies__none}>Currently you don't observe any cryptocurrency.</p>;
	}

	return (
		<Container>
			<TableWrapper>{currenciestoDisplay}</TableWrapper>
		</Container>
	);
};

export default ObservedCurrencies;
