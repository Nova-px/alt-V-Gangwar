import Vue from 'vue';
import App from './App.vue';

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

import './plugins/alt';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;
Vue.use(Toast, {
    closeOnClick: false,
    closeButton: false,
    pauseOnHover: false,
    draggable: false,
    pauseOnFocusLoss: false
});

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
