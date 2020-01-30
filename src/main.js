import Vue from 'vue';
import './plugins/axios';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import progressiveimg from './plugins/progressiveimg';
import moment from './plugins/moment';

Vue.config.productionTip = false;

Vue.filter('truncate', (text, length) => `${text.substring(0, length)}...`);

new Vue({
  router,
  store,
  vuetify,
  progressiveimg,
  moment,
  render: h => h(App),
}).$mount('#app');
