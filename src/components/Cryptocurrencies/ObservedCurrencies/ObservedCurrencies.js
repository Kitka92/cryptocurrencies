import TableWrapper from '../../UI/TableWrapper/TableWrapper';
import Cryptocurrency from '../Cryptocurrency/Cryptocurrency';

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
		/>
	));

	return <TableWrapper>{currenciestoDisplay}</TableWrapper>;
};

export default ObservedCurrencies;
