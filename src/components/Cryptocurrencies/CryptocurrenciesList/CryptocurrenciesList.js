import { useState, useEffect } from 'react';
import styles from './CryptocurrenciesList.module.css';
import Cryptocurrency from '../Cryptocurrency/Cryptocurrency';
import axios from 'axios';

const API_KEY = 'ab9b3876-c43d-425a-b9f8-3756e97bda52';

const CryptocurrenciesList = (props) => {
	const [ cryptocurrencies, setCryptocurrencies ] = useState([]);

	const fetchData = async () => {
		try {
			const responseCryptocurrencies = await axios.get(
				`http://localhost:8080/https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=${API_KEY}&limit=10`
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
					return cryptocurrency;
				});
			});
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const cryptocurrenciesList = cryptocurrencies.map((cryptocurrency) => {
		return (
			<Cryptocurrency
				key={cryptocurrency.id}
				id={cryptocurrency.id}
				name={cryptocurrency.name}
				icon={cryptocurrency.icon}
				symbol={cryptocurrency.symbol}
				price={cryptocurrency.quote.USD.price}
				oneHourChange={cryptocurrency.quote.USD.percent_change_1h}
				oneDayChange={cryptocurrency.quote.USD.percent_change_24h}
				sevenDaysChange={cryptocurrency.quote.USD.percent_change_7d}
			/>
		);
	});

	if (cryptocurrencies.length === 0) {
		return null;
	} else {
		return (
			<div>
				<h1>Cryptocurrencies List</h1>
				<table className={styles.cryptocurrenciesList__table}>
					<tbody>
						<tr>
							<th className={styles.cryptocurrenciesList__theads}>Icon</th>
							<th className={styles.cryptocurrenciesList__theads}>Name</th>
							<th className={styles.cryptocurrenciesList__theads}>Symbol</th>
							<th className={styles.cryptocurrenciesList__theads}>Price</th>
							<th className={styles.cryptocurrenciesList__theads}>1h change</th>
							<th className={styles.cryptocurrenciesList__theads}>24h change</th>
							<th className={styles.cryptocurrenciesList__theads}>7days change</th>
						</tr>
						{cryptocurrenciesList}
					</tbody>
				</table>
			</div>
		);
	}
};

export default CryptocurrenciesList;
