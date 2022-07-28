export default {
	state: {
		show: false,
		message: null,
		type: null,
	},
	getters: {
		show: (state) => state.show,
		message: (state) => state.message,
		type: (state) => state.type,
	},
	actions: {
		show: (store, payload) => {
			// {message: string, type: 'error'} => payload
			store.commit('SET_MESSAGE', payload.message);
			store.commit('SET_TYPE', payload.type);
			store.commit('TOGGLE_SHOW');
			setTimeout(() => {
				store.commit('TOGGLE_SHOW');
			}, 3000);
		},
	},
	mutations: {
		TOGGLE_SHOW: (state) => {
			state.show = !state.show;
		},
		SET_MESSAGE: (state, message) => {
			state.message = message;
		},
		SET_TYPE: (state, type) => {
			state.type = type;
		},
	},
	namespaced: true,
};
