export const getDataFromLocalStorage = (key) => {
	if (key) {
		return localStorage.getItem(key);
	} else {
		console.warn('error while getting data from localStorage');
		return JSON.stringify({});
	}
};
