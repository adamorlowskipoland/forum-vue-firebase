import Vue from 'vue';
import firebase from 'firebase';
import AppDate from '@/components/AppDate.vue';
import App from './App.vue';
import router from './router';
import store from './store';

const config = {
  apiKey: 'yourAppApiKey',
  authDomain: 'yourAuthDomain',
  databaseURL: 'yourDatabaseURL',
  projectId: 'yourProjectId',
  storageBucket: 'yourStorageBucket',
  messagingSenderId: 'yourSenderId',
};
firebase.initializeApp(config);

// registering global component
Vue.component('AppDate', AppDate);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
