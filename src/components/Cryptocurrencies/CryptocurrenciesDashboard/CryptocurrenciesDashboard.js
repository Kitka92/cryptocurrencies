import { useEffect } from 'react';
import Header from '../../UI/Header/Header';
import CryptocurrenciesList from '../CryptocurrenciesList/CryptocurrenciesList';
import ObservedCurrencies from '../ObservedCurrencies/ObservedCurrencies';
import Search from '../Search/Search';
import { Route, Switch } from 'react-router-dom';
import useCryptocurrencies from '../../../hooks/useCryptocurrencies';

const CryptocurrenciesDasboard = () => {
	const { cryptocurrencies, fetchData, handleObserved, handleRemoval, handleSearch } = useCryptocurrencies([]);

	useEffect(() => {
		fetchData();
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
								cryptocurrencies={cryptocurrencies}
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
