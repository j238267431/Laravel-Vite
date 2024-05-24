import Home from '../../components/Home.vue';
import About from '../../components/About.vue';
import Desks from '../../components/desks/Desks.vue';
import ShowDesk from '../../components/desks/ShowDesk.vue';

const routes = [
   {
      path: '/',
      name: 'home',
      component: Home
   },
   {
      path: '/about',
      name: 'about',
      component: About
   },
   {
      path: '/desks',
      name: 'desks',
      component: Desks
   },
   {
      path: '/desks/:deskid',
      name: 'showDesk',
      component: ShowDesk,
      props: true,
   }
]

export default routes;