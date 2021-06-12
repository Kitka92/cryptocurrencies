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

	const removeCurrenciesFromObserved = (currencyId) => {
		const observedCurrencyId = props.cryptocurrencies
			.filter((currency) => currency.id === currencyId)
			.map((currency) => currency.id);

		const observedCurrenciesIdsCopy = new Set(observedCurrenciesIds);

		observedCurrencyId.forEach((value) => {
			observedCurrenciesIdsCopy.delete(value);
			setObservedCurrenciesIds(new Set(observedCurrenciesIdsCopy));
		});
	};

	return (
		<ObservedCurrenciesContext.Provider
			value={{ observedCurrenciesIds, addCurrenciesToObserved, removeCurrenciesFromObserved }}
		>
			{props.children}
		</ObservedCurrenciesContext.Provider>
	);
};
