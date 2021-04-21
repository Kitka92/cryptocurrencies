import Header from './components/UI/Header/Header';
import CryptocurrenciesList from './components/Cryptocurrencies/CryptocurrenciesList/CryptocurrenciesList';
import ObservedCurrencies from './components/Cryptocurrencies/ObservedCurrencies/ObservedCurrencies';

import { Route, Switch } from 'react-router-dom';

const App = () => {
	return (
		<div>
			<Header />
			<Switch>
				<Route exact path="/" component={CryptocurrenciesList} />
				<Route exact path="/observed" render={() => <ObservedCurrencies />} />
			</Switch>
			{/* <CryptocurrenciesList /> */}
		</div>
	);
};

export default App;
