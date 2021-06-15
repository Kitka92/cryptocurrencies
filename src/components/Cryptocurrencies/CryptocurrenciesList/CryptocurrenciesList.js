import { useState, useContext } from 'react';
import TableWrapper from '../../UI/TableWrapper/TableWrapper';
import Cryptocurrency from '../Cryptocurrency/Cryptocurrency';
import Container from '../../UI/Container/Container';
import filterCurrencies from '../../../helpers/filterCurrencies';
import { ThemeContext } from '../../../context/ThemeContext';

import styles from './CryptocurrenciesList.module.css';
import { ObservedCurrenciesContext } from '../../../context/ObservedCurrenciesContext';

const CryptocurrenciesList = (props) => {
	const [ searchedVal, setSearchedVal ] = useState('');
	const { isDarkMode } = useContext(ThemeContext);
	const { observedCurrenciesIds } = useContext(ObservedCurrenciesContext);

	const cryptoCurrenciesToDisplay = filterCurrencies(searchedVal, props.cryptocurrencies);
	const cryptocurrenciesList = cryptoCurrenciesToDisplay.map((cryptocurrency) => {
		return (
			<Cryptocurrency
				key={cryptocurrency.id}
				{...cryptocurrency}
				isObserved={observedCurrenciesIds.has(cryptocurrency.id)}
			/>
		);
	});

	const handleChange = (event) => {
		setSearchedVal(event.target.value);
	};

	if (props.cryptocurrencies.length === 0) {
		return null;
	}
	return (
		<div className={isDarkMode ? `${styles.cryptocurrenciesList} ${styles.dark}` : styles.cryptocurrenciesList}>
			<Container>
				<input placeholder="Search by name or symbol..." onChange={handleChange} value={searchedVal} />
				<TableWrapper>{cryptocurrenciesList}</TableWrapper>
			</Container>
		</div>
	);
};

export default CryptocurrenciesList;
