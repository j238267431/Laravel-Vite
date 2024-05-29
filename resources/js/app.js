import './bootstrap';

import 'flowbite';

import {createApp} from 'vue'
import App from './components/App.vue';
import router from './src/router/router';
import store from './src/store/store';



createApp(App)
   .use(store)
   .use(router)
   .mount("#app")


