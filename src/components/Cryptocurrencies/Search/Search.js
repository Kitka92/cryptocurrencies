import { useState } from 'react';
import Container from '../../UI/Container/Container';
import styles from './Search.module.css';

const Search = (props) => {
	const [ searchedValue, setSearchedValue ] = useState('');

	const handleChange = (event) => {
		console.warn(`Search.handleChange event.target.value = ${event.target.value}`);
		setSearchedValue(event.target.value);
		props.onSearch(event.target.value);
	};
	return (
		<Container>
			<input
				className={styles.search}
				type="text"
				placeholder="Search by name or symbol..."
				onChange={handleChange}
				value={searchedValue}
			/>
		</Container>
	);
};

export default Search;
