const handleSearch = (searchedItem, allCurrencies, setCurrencies) => {
	if (!searchedItem) {
		setCurrencies(allCurrencies);
		return;
	}
	const searchedCurrencies = allCurrencies.filter((currency) => {
		return (
			currency.name.toLowerCase().includes(searchedItem.toLowerCase()) ||
			currency.symbol.toLowerCase().includes(searchedItem.toLowerCase())
		);
	});
	setCurrencies(searchedCurrencies);
};

export default handleSearch;
