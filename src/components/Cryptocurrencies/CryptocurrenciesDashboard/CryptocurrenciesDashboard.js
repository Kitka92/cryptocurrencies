import { useState, useEffect } from 'react';
import Header from '../../UI/Header/Header';
import CryptocurrenciesList from '../CryptocurrenciesList/CryptocurrenciesList';
import ObservedCurrencies from '../ObservedCurrencies/ObservedCurrencies';
import Search from '../Search/Search';
import { Route, Switch } from 'react-router-dom';
import useCryptocurrencies from '../../../hooks/useCryptocurrencies';

const CryptocurrenciesDasboard = () => {
	const [ time, setTime ] = useState(new Date().toDateString());

	const {
		cryptocurrencies,
		searchedCurrencies,
		fetchData,
		handleObserved,
		handleRemoval,
		handleSearch
	} = useCryptocurrencies(time);

	useEffect(() => {
		fetchData();
		setTime(new Date().toDateString());
	}, []);

	return (
		<div>
			<Header />
			<Switch>
				<Route
					exact
					path="/"
					render={() => (
						<div>
							<Search onSearch={handleSearch} />
							<CryptocurrenciesList
								cryptocurrencies={searchedCurrencies}
								addToBeObserved={handleObserved}
								removeFromObserved={handleRemoval}
							/>
						</div>
					)}
				/>
				<Route
					exact
					path="/observed"
					render={() => (
						<ObservedCurrencies
							observableCurrencies={cryptocurrencies}
							removeFromObserved={handleRemoval}
						/>
					)}
				/>
			</Switch>
		</div>
	);
};

export default CryptocurrenciesDasboard;
