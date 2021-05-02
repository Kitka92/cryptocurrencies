import { useState } from 'react';
import TableWrapper from '../../UI/TableWrapper/TableWrapper';
import Cryptocurrency from '../Cryptocurrency/Cryptocurrency';
import Container from '../../UI/Container/Container';
import styles from './CryptocurrenciesList.module.css';
import toggleObserved from '../../../helpers/toggleObserved';

const CryptocurrenciesList = (props) => {
	const [ searchedVal, setSearchedVal ] = useState('');
	const setObserved = toggleObserved(props.cryptocurrencies, props.setCurrencies);

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
				toggleObserved={setObserved}
			/>
		);
	});

	const handleChange = (event) => {
		setSearchedVal(event.target.value);
		props.onSearch(event.target.value, props.cryptocurrencies, props.setSearchedCurrencies);
	};

	if (props.cryptocurrencies.length === 0) {
		return null;
	}
	return (
		<div className={styles.cryptocurrenciesList}>
			<Container>
				<input placeholder="Search by name or symbol..." onChange={handleChange} value={searchedVal} />
				<TableWrapper>{cryptocurrenciesList}</TableWrapper>
			</Container>
		</div>
	);
};

export default CryptocurrenciesList;
