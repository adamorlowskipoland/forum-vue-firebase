import Vue from 'vue';
import AppDate from '@/components/AppDate.vue';
import App from './App.vue';
import router from './router';
import store from './store';


// registering global component
Vue.component('AppDate', AppDate);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
