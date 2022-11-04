import { createApp } from "vue";
import { createPinia } from "pinia";
import "./style.css";
import App from "./App.vue";
import router from "./router";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_API_KEY,
  authDomain: import.meta.env.VITE_APP_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_APP_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_APP_ID,
};

const pinia = createPinia();

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const store = createPinia();
export const db = getFirestore(app);
export const firestore = getFirestore(app);
export const firebaseAuth = getAuth(app);
export const storage = getStorage(app);

const vue = createApp(App);
vue.use(pinia);
vue.use(router);
vue.mount("#app");
