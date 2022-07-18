import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./index.css";
import { initializeApp } from "firebase/app";

Vue.config.productionTip = false;

const firebaseConfig = {
  apiKey: "AIzaSyAr6P-jiu-eP6E0EmACNBhLbHLwQiTFwEU",
  authDomain: "inventorsoft-vue-2022-d566c.firebaseapp.com",
  projectId: "inventorsoft-vue-2022-d566c",
  storageBucket: "inventorsoft-vue-2022-d566c.appspot.com",
  messagingSenderId: "416668904151",
  appId: "1:416668904151:web:c18c721b121ab58bf45e92"
};

initializeApp(firebaseConfig);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
