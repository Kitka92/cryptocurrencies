import styles from './Cryptocurrency.module.css';

const Cryptocurrency = (props) => {
	const handleClick = () => {
		props.addToObserved(props.id);
	};

	return (
		<tr className={styles.cryptocurrency}>
			<td>
				<img alt={`${props.name} icon`} src={`${props.icon}`} />
			</td>
			<td>{props.name}</td>
			<td>{props.symbol}</td>
			<td>$ {props.price}</td>
			<td>{props.oneHourChange}%</td>
			<td>{props.oneDayChange}%</td>
			<td>{props.sevenDaysChange}%</td>
			<td>
				<button onClick={handleClick}>Add to observed</button>
			</td>
		</tr>
	);
};

export default Cryptocurrency;
