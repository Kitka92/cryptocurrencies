import Button from '../../UI/Button/Button';
import styles from './Cryptocurrency.module.css';

const Cryptocurrency = (props) => {
	const handleAddition = () => {
		props.addToObserved(props.id);
	};

	const handleRemoval = () => {
		props.removeFromBeingObserved(props.id);
	};

	let button = <Button onClick={handleAddition} buttonMessage="Add to observed" />;

	if (props.isObserved) {
		button = <Button onClick={handleRemoval} buttonMessage="Remove from observed" />;
	}

	return (
		<tr className={styles.cryptocurrency}>
			<td>
				<img alt={`${props.name} icon`} src={`${props.icon}`} />
			</td>
			<td>{props.name}</td>
			<td>{props.symbol}</td>
			<td>$ {Math.round((props.price + Number.EPSILON) * 100) / 100}</td>
			<td>{Math.round((props.oneHourChange + Number.EPSILON) * 100) / 100} %</td>
			<td>{Math.round((props.oneDayChange + Number.EPSILON) * 100) / 100} %</td>
			<td>{Math.round((props.sevenDaysChange + Number.EPSILON) * 100) / 100} %</td>
			<td>{button}</td>
		</tr>
	);
};

export default Cryptocurrency;
