const filterCurrencies = (searchedItem, allCurrencies) => {
	if (!searchedItem) {
		return allCurrencies;
	}
	const searchedCurrencies = allCurrencies.filter((currency) => {
		return (
			currency.name.toLowerCase().includes(searchedItem.toLowerCase()) ||
			currency.symbol.toLowerCase().includes(searchedItem.toLowerCase())
		);
	});
	return searchedCurrencies;
};

export default filterCurrencies;
