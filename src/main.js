import Vue from 'vue';
import firebase from 'firebase';
import vuelidate from 'vuelidate';
import AppDate from '@/components/AppDate.vue';
import App from './App.vue';
import router from './router';
import store from './store';

const config = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTHDOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASEURL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGINGSENDERID,
};
firebase.initializeApp(config);

Vue.use(vuelidate);

// registering global component
Vue.component('AppDate', AppDate);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
