import { useState } from 'react';
import TableWrapper from '../../UI/TableWrapper/TableWrapper';
import Cryptocurrency from '../Cryptocurrency/Cryptocurrency';
import Container from '../../UI/Container/Container';
import styles from './CryptocurrenciesList.module.css';

const CryptocurrenciesList = (props) => {
	const [ searchedValue, setSearchedValue ] = useState('');

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
				removeFromBeingObserved={props.removeFromObserved}
			/>
		);
	});

	const handleChange = (event) => {
		setSearchedValue(event.target.value);
	};

	if (props.cryptocurrencies.length === 0) {
		return null;
	}
	return (
		<div className={styles.cryptocurrenciesList}>
			<Container>
				<input type="text" placeholder="Search..." onChange={handleChange} />
				<TableWrapper>{cryptocurrenciesList}</TableWrapper>
			</Container>
		</div>
	);
};

export default CryptocurrenciesList;
