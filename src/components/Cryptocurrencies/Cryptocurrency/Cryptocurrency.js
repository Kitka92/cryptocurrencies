import styles from './Cryptocurrency.module.css';

const Cryptocurrency = (props) => {
	return (
		<tr className={styles.cryptocurrency}>
			<td>
				<img src={`${props.icon}`} />
			</td>
			<td>{props.name}</td>
			<td>{props.symbol}</td>
			<td>$ {props.price}</td>
			<td>{props.oneHourChange}%</td>
			<td>{props.oneDayChange}%</td>
			<td>{props.sevenDaysChange}%</td>
		</tr>
	);
};

export default Cryptocurrency;
