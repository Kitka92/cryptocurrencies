import { createContext, useState } from 'react';
import { getDataFromLocalStorage } from '../helpers/localStorageFinder';

export const ObservedCurrenciesContext = createContext();

const newLocal = 'observedCurrenciesIds';
export const ObservedCurrenciesProvider = (props) => {
	const getObservedCurrenciesFromLocalStorage = () => {
		return new Set(JSON.parse(getDataFromLocalStorage(newLocal)));
	};
	const [ observedCurrenciesIds, setObservedCurrenciesIds ] = useState(getObservedCurrenciesFromLocalStorage());

	const toggleObserved = (currencyId) => {
		const observedCurrencyId = props.cryptocurrencies
			.filter((currency) => currency.id === currencyId)
			.map((currency) => currency.id);

		if (observedCurrencyId.length === 0) {
			return;
		}

		const observedCurrenciesIdsCopy = new Set(observedCurrenciesIds);
		const [ observedCurrencyIdValue ] = observedCurrencyId;

		if (observedCurrenciesIds.has(currencyId)) {
			observedCurrenciesIdsCopy.delete(observedCurrencyIdValue);
		} else {
			observedCurrenciesIdsCopy.add(observedCurrencyIdValue);
		}
		localStorage.setItem(newLocal, JSON.stringify([ ...observedCurrenciesIdsCopy ]));
		setObservedCurrenciesIds(new Set(observedCurrenciesIdsCopy));
	};

	return (
		<ObservedCurrenciesContext.Provider value={{ observedCurrenciesIds, toggleObserved }}>
			{props.children}
		</ObservedCurrenciesContext.Provider>
	);
};
