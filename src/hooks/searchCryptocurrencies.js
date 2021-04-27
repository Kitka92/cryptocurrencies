import { useState } from 'react';

const useSearchCryptocurrencies = (allCryptos) => {
	const [ searchedCurrencies, setSearchedCurrencies ] = useState([ ...allCryptos ]);

	const handleSearch = (searchedItem) => {
		if (searchedItem === null || searchedItem === '') {
			setSearchedCurrencies(allCryptos);
			return;
		}

		const filteredCryptocurrencies = allCryptos.filter((currency) => {
			return (
				currency.name.toLowerCase().includes(searchedItem.toLowerCase()) ||
				currency.symbol.toLowerCase().includes(searchedItem.toLowerCase())
			);
		});

		setSearchedCurrencies(filteredCryptocurrencies);
	};

	return {
		handleSearch: handleSearch,
		searchedCurrencies: searchedCurrencies
	};
};

export default useSearchCryptocurrencies;
