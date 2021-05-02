const handleObserved = (allCurrencies, setCurrencies) => {
	const toggleObserved = (currencyId) => {
		const cryptocurrenciesToToggle = allCurrencies.map(
			(cryptocurrency) =>
				cryptocurrency.id === currencyId
					? { ...cryptocurrency, isObserved: !cryptocurrency.isObserved }
					: cryptocurrency
		);
		setCurrencies(cryptocurrenciesToToggle);
	};
};

export default handleObserved;
