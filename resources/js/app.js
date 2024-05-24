import './bootstrap';

// window.Vue = require('vue').default;
// import Vue from 'vue';
// import VueRouter from 'vue-router';
// import { createMemoryHistory, createRouter } from 'vue-router'
import 'flowbite';
// import Vuelidate from 'vuelidate'
// import * as VeeValidate from 'vee-validate';
// import { Validator } from 'vee-validate';
// import ru from 'vee-validate/dist/locale/ru';

// Validator.localize('ru', ru);
// Vue.use(VeeValidate, {
//   locale: 'ru',
// });

// Vue.use(Vuelidate)
// Vue.use(VueRouter);
import {createApp} from 'vue'

// import App from './components/App.vue'



import App from './components/App.vue';
// import Home from './components/Home.vue';
// import About from './components/About.vue';
// import Desks from './components/desks/Desks.vue';
// import ShowDesk from './components/desks/ShowDesk.vue';
import router from './src/router/router';

// const router = createRouter({
//    history: createMemoryHistory(),
//    routes:[
//       {
//          path: '/',
//          name: 'home',
//          component: Home
//       },
//       {
//          path: '/about',
//          name: 'about',
//          component: About
//       },
//       {
//          path: '/desks',
//          name: 'desks',
//          component: Desks
//       },
//       {
//          path: '/desks/:deskid',
//          name: 'showDesk',
//          component: ShowDesk,
//          props: true,
//       }
//    ]
// })
createApp(App)
   .use(router)
   .mount("#app")


