import styles from './TableWrapper.module.css';

const TableWrapper = (props) => {
	return (
		<table className={styles.tablewrapper}>
			<tbody>
				<tr>
					<th className={styles.tablewrapper__theads}>Icon</th>
					<th className={styles.tablewrapper__theads}>Name</th>
					<th className={styles.tablewrapper__theads}>Symbol</th>
					<th className={styles.tablewrapper__theads}>Price</th>
					<th className={styles.tablewrapper__theads}>1h change</th>
					<th className={styles.tablewrapper__theads}>24h change</th>
					<th className={styles.tablewrapper__theads}>7days change</th>
					<th />
				</tr>
				{props.children}
			</tbody>
		</table>
	);
};

export default TableWrapper;
