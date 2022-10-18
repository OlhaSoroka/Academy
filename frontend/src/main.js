import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './index.css';
import { initializeApp } from 'firebase/app';
import clickOutsideDirective from './directives/click-outside.directive';

import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
	apiKey: process.env.VUE_APP_API_KEY,
	authDomain: process.env.VUE_APP_AUTH_DOMAIN,
	projectId: process.env.VUE_APP_PROJECT_ID,
	storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
	messagingSenderId: process.env.VUE_APP_MESSAGEING_SENDER_ID,
	appId: process.env.VUE_APP_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const firestore = getFirestore(app);
export const firebaseAuth = getAuth(app);
export const storage = getStorage(app);


Vue.config.productionTip = false;

Vue.directive('click-outside-table', clickOutsideDirective);

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount('#app');
