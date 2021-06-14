import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Header from '../../UI/Header/Header';
import CryptocurrenciesList from '../CryptocurrenciesList/CryptocurrenciesList';
import ObservedCurrencies from '../ObservedCurrencies/ObservedCurrencies';
import { ThemeProvider } from '../../../context/ThemeContext';
import { LanguageProvider } from '../../../context/LanguageContext';
import { Route, Switch } from 'react-router-dom';
import { ObservedCurrenciesProvider } from '../../../context/ObservedCurrenciesContext';

const CryptocurrenciesDasboard = () => {
	const API_KEY = 'ab9b3876-c43d-425a-b9f8-3756e97bda52';
	const [ cryptocurrencies, setCryptocurrencies ] = useState([]);

	const getObservedCurrenciesFromLocalStorage = (key) => {
		if (key) {
			return new Set(JSON.parse(localStorage.getItem(key)));
		} else {
			console.log('error while getting data from localStorage');
		}
	};

	const fetchCurrencies = useCallback(async () => {
		const response = await axios.get(
			`http://localhost:8080/https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=${API_KEY}&limit=10`
		);

		const cryptocurrenciesData = response.data;

		const ids_array = cryptocurrenciesData.data.map((cryptocurrency) => cryptocurrency.id);
		const imagesToFetch = ids_array.join(',');

		const responseIcons = await axios.get(
			`http://localhost:8080/https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?CMC_PRO_API_KEY=${API_KEY}&id=${imagesToFetch}`
		);

		const iconsData = responseIcons.data;

		const cryptocurrenciesWithImages = cryptocurrenciesData.data.map((cryptocurrency) => {
			cryptocurrency.icon = iconsData.data[cryptocurrency.id].logo;
			return cryptocurrency;
		});

		const alreadyObservedCurrencies = getObservedCurrenciesFromLocalStorage('observedCurrenciesIds');

		const transformedCurrencies = cryptocurrenciesWithImages.map((currency) => {
			let isObserved;
			if (alreadyObservedCurrencies.has(currency.id)) {
				isObserved = true;
			} else {
				isObserved = false;
			}

			return {
				id: currency.id,
				name: currency.name,
				icon: currency.icon,
				isObserved: isObserved,
				symbol: currency.symbol,
				price: currency.quote.USD.price,
				oneHourChange: currency.quote.USD.percent_change_1h,
				oneDayChange: currency.quote.USD.percent_change_24h,
				sevenDaysChange: currency.quote.USD.percent_change_7d
			};
		});

		setCryptocurrencies(transformedCurrencies);
	}, []);

	useEffect(
		() => {
			fetchCurrencies();
		},
		[ fetchCurrencies ]
	);

	return (
		<ThemeProvider>
			<LanguageProvider>
				<Header />
				<ObservedCurrenciesProvider cryptocurrencies={cryptocurrencies}>
					<Switch>
						<Route
							exact
							path="/"
							render={() => (
								<CryptocurrenciesList
									cryptocurrencies={cryptocurrencies}
									setCurrencies={setCryptocurrencies}
								/>
							)}
						/>
						<Route
							exact
							path="/observed"
							render={() => (
								<ObservedCurrencies
									observableCurrencies={cryptocurrencies}
									setCurrencies={setCryptocurrencies}
								/>
							)}
						/>
					</Switch>
				</ObservedCurrenciesProvider>
			</LanguageProvider>
		</ThemeProvider>
	);
};

export default CryptocurrenciesDasboard;
