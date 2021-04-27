import { useState } from 'react';
import axios from 'axios';

const useCryptocurrencies = (initialVal) => {
	const API_KEY = 'ab9b3876-c43d-425a-b9f8-3756e97bda52';
	const [ cryptocurrencies, setCryptocurrencies ] = useState(initialVal);

	return {
		cryptocurrencies,
		fetchData: async () => {
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
		},
		handleObserved: (currencyId) => {
			const cryptocurrenciesToObserve = cryptocurrencies.map(
				(cryptocurrency) =>
					cryptocurrency.id === currencyId ? { ...cryptocurrency, isObserved: true } : cryptocurrency
			);
			setCryptocurrencies(cryptocurrenciesToObserve);
		},
		handleRemoval: (currencyId) => {
			const cryptocurrenciesToRemoveFromObserved = cryptocurrencies.map(
				(cryptocurrency) =>
					cryptocurrency.id === currencyId ? { ...cryptocurrency, isObserved: false } : cryptocurrency
			);
			setCryptocurrencies(cryptocurrenciesToRemoveFromObserved);
		},
		handleSearch: (searchedItem) => {
			const filteredCryptocurrencies = cryptocurrencies.filter((currency) => {
				return (
					currency.name.toLowerCase().includes(searchedItem.toLowerCase()) ||
					currency.symbol.toLowerCase().includes(searchedItem.toLowerCase())
				);
			});

			setCryptocurrencies(filteredCryptocurrencies);
		}
	};
};

export default useCryptocurrencies;
