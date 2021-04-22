import TableWrapper from '../../UI/TableWrapper/TableWrapper';
import Cryptocurrency from '../Cryptocurrency/Cryptocurrency';

const CryptocurrenciesList = (props) => {
	const cryptocurrenciesList = props.cryptocurrencies.map((cryptocurrency) => {
		return (
			<Cryptocurrency
				key={cryptocurrency.id}
				id={cryptocurrency.id}
				name={cryptocurrency.name}
				icon={cryptocurrency.icon}
				isObserved={cryptocurrency.isObserved}
				symbol={cryptocurrency.symbol}
				price={cryptocurrency.quote.USD.price}
				oneHourChange={cryptocurrency.quote.USD.percent_change_1h}
				oneDayChange={cryptocurrency.quote.USD.percent_change_24h}
				sevenDaysChange={cryptocurrency.quote.USD.percent_change_7d}
				addToObserved={props.addToBeObserved}
			/>
		);
	});

	if (props.cryptocurrencies.length === 0) {
		return null;
	} else {
		return <TableWrapper>{cryptocurrenciesList}</TableWrapper>;
	}
};

export default CryptocurrenciesList;
