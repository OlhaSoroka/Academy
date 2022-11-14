import { createApp } from "vue";
import { createPinia } from "pinia"; // Import

import App from './App.vue';
import router from "./router";
import "./style.css";

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

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
export const db = getFirestore(firebase);
export const firestore = getFirestore(firebase);
export const firebaseAuth = getAuth(firebase);
export const storage = getStorage(firebase);

const app = createApp(App);

app.use(createPinia()); // Create the root store
app.use(router);

app.mount("#app");
