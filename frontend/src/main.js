import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './index.css';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
	apiKey: process.env.VUE_APP_API_KEY,
	authDomain: process.env.VUE_APP_AUTH_DOMAIN,
	projectId: process.env.VUE_APP_PROJECT_ID,
	storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
	messagingSenderId: process.env.VUE_APP_MESSAGEING_SENDER_ID,
	appId: process.env.VUE_APP_APP_ID,
};

// Initialize Firebase
initializeApp(firebaseConfig);

Vue.config.productionTip = false;

Vue.directive('click-outside-table', {
	bind: function (table, _, vnode) {
		table.clickOutsideEvent = function (event) {
			if (!(table === event.target || table.contains(event.target))) {
				vnode.context.onClickOutside()
			}
		};
		document.body.addEventListener('click', table.clickOutsideEvent);
	},
	unbind: function (table) {
		document.body.removeEventListener('click', table.clickOutsideEvent);
	},
});

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount('#app');
