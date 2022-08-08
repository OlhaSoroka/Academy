import axios from 'axios';
import store from '../store';

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response.status === 401) {
			store.dispatch('user/logoutUser', null, { root: true });
		}
		throw error;
	}
);

export default axiosInstance;
