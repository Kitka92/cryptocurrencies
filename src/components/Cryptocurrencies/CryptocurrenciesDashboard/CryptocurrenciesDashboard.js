import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../UI/Header/Header';
import CryptocurrenciesList from '../CryptocurrenciesList/CryptocurrenciesList';
import ObservedCurrencies from '../ObservedCurrencies/ObservedCurrencies';
import { Route, Switch } from 'react-router-dom';

const CryptocurrenciesDasboard = () => {
	const API_KEY = 'ab9b3876-c43d-425a-b9f8-3756e97bda52';
	const [ cryptocurrencies, setCryptocurrencies ] = useState([]);

	const fetchData = async () => {
		try {
			const responseCryptocurrencies = await axios.get(
				`http://localhost:8080/https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=${API_KEY}&limit=50`
			);

			const cryptocurrenciesData = responseCryptocurrencies.data;

			const ids_array = cryptocurrenciesData.data.map((cryptocurrency) => cryptocurrency.id);
			const imagesToFetch = ids_array.join(',');

			const responseIcons = await axios.get(
				`http://localhost:8080/https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?CMC_PRO_API_KEY=${API_KEY}&id=${imagesToFetch}`
			);

			const iconsData = responseIcons.data;

			setCryptocurrencies(() => {
				return cryptocurrenciesData.data.map((cryptocurrency) => {
					cryptocurrency.icon = iconsData.data[cryptocurrency.id].logo;
					cryptocurrency.isObserved = false;
					return cryptocurrency;
				});
			});
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const handleObserved = (currencyId) => {
		const cryptocurrenciesToObserve = cryptocurrencies.map(
			(cryptocurrency) =>
				cryptocurrency.id === currencyId ? { ...cryptocurrency, isObserved: true } : cryptocurrency
		);
		setCryptocurrencies(cryptocurrenciesToObserve);
	};

	return (
		<div>
			<Header />
			<Switch>
				<Route
					exact
					path="/"
					render={() => (
						<CryptocurrenciesList cryptocurrencies={cryptocurrencies} addToBeObserved={handleObserved} />
					)}
				/>
				<Route
					exact
					path="/observed"
					render={() => <ObservedCurrencies observableCurrencies={cryptocurrencies} />}
				/>
			</Switch>
		</div>
	);
};

export default CryptocurrenciesDasboard;