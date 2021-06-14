import { createContext, useState } from 'react';

export const ObservedCurrenciesContext = createContext();

export const ObservedCurrenciesProvider = (props) => {
	const [ observedCurrenciesIds, setObservedCurrenciesIds ] = useState(new Set());

	const toggleObserved = (currencyId) => {
		const observedCurrencyId = props.cryptocurrencies
			.filter((currency) => currency.id === currencyId)
			.map((currency) => currency.id);

		const observedCurrenciesIdsCopy = new Set(observedCurrenciesIds);
		const [ observedCurrencyIdValue ] = observedCurrencyId;

		if (observedCurrenciesIds.has(currencyId)) {
			observedCurrenciesIdsCopy.delete(observedCurrencyIdValue);
		} else {
			observedCurrenciesIdsCopy.add(observedCurrencyIdValue);
		}
		setObservedCurrenciesIds(new Set(observedCurrenciesIdsCopy));
		localStorage.setItem('observedCurrenciesIds', JSON.stringify([ ...observedCurrenciesIdsCopy ]));
	};

	return (
		<ObservedCurrenciesContext.Provider value={{ observedCurrenciesIds, toggleObserved }}>
			{props.children}
		</ObservedCurrenciesContext.Provider>
	);
};
