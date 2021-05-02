import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../UI/Header/Header';
import CryptocurrenciesList from '../CryptocurrenciesList/CryptocurrenciesList';
import ObservedCurrencies from '../ObservedCurrencies/ObservedCurrencies';
// import useCustomHook from '../../../hooks/useCustomHook';
import { Route, Switch } from 'react-router-dom';

const CryptocurrenciesDasboard = () => {
	const API_KEY = 'ab9b3876-c43d-425a-b9f8-3756e97bda52';
	const [ cryptocurrencies, setCryptocurrencies ] = useState([]);
	const [ searchedCurrencies, setSearchedCurrencies ] = useState([]);
	// const [ number, setNumber ] = useState(1);

	// const propsForCustomHooks = {
	// 	number: 1
	// };

	// useCustomHook(number);

	// useEffect(() => {
	// 	setInterval(() => {
	// 		const newNumber = number + 1;
	// 		setNumber(newNumber);
	// 		console.log('incremented ', newNumber);
	// 	}, 2000);
	// });

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

			const cryptocurrenciesWithImages = cryptocurrenciesData.data.map((cryptocurrency) => {
				cryptocurrency.icon = iconsData.data[cryptocurrency.id].logo;
				cryptocurrency.isObserved = false;
				return cryptocurrency;
			});

			setCryptocurrencies(cryptocurrenciesWithImages);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(
		() => {
			setSearchedCurrencies([ ...cryptocurrencies ]);
		},
		[ cryptocurrencies ]
	);

	const toggleObserved = (currencyId) => {
		const cryptocurrenciesToToggle = cryptocurrencies.map(
			(cryptocurrency) =>
				cryptocurrency.id === currencyId
					? { ...cryptocurrency, isObserved: !cryptocurrency.isObserved }
					: cryptocurrency
		);
		setCryptocurrencies(cryptocurrenciesToToggle);
	};

	const handleSearch = (searchedItem) => {
		const searchedCurrencies = cryptocurrencies.filter((currency) => {
			return (
				currency.name.toLowerCase().includes(searchedItem.toLowerCase()) ||
				currency.symbol.toLowerCase().includes(searchedItem.toLowerCase())
			);
		});
		setSearchedCurrencies(searchedCurrencies);
	};

	return (
		<div>
			<Header />
			<Switch>
				<Route
					exact
					path="/"
					render={() => (
						<CryptocurrenciesList
							cryptocurrencies={searchedCurrencies}
							toggleObserved={toggleObserved}
							onSearch={handleSearch}
						/>
					)}
				/>
				<Route
					exact
					path="/observed"
					render={() => (
						<ObservedCurrencies observableCurrencies={cryptocurrencies} toggleObserved={toggleObserved} />
					)}
				/>
			</Switch>
		</div>
	);
};

export default CryptocurrenciesDasboard;
