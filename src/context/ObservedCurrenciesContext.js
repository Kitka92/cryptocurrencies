import { createContext, useState } from 'react';

export const ObservedCurrenciesContext = createContext();

export const ObservedCurrenciesProvider = (props) => {
	const [ observedCurrenciesIds, setObservedCurrenciesIds ] = useState(new Set());

	const addCurrenciesToObserved = (currencyId) => {
		const observedCurrencyId = props.cryptocurrencies
			.filter((currency) => currency.id === currencyId)
			.map((currency) => currency.id);

		setObservedCurrenciesIds(
			(observedCurrenciesIds) => new Set([ ...observedCurrenciesIds, ...observedCurrencyId ])
		);
	};

	return (
		<ObservedCurrenciesContext.Provider value={{ observedCurrenciesIds, addCurrenciesToObserved }}>
			{props.children}
		</ObservedCurrenciesContext.Provider>
	);
};
