import styles from './Button.module.css';

const Button = (props) => {
	return (
		<button className={styles.button} onClick={props.onClick}>
			{props.buttonMessage}
		</button>
	);
};

export default Button;
