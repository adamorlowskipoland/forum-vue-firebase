import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import ThreadShow from './views/ThreadShow.vue';
import ThreadEdit from './views/ThreadEdit.vue';
import ThreadCreate from './views/ThreadCreate.vue';
import Category from './views/Category.vue';
import Forum from './views/Forum.vue';
import Profile from './views/Profile.vue';
import Register from './views/Register.vue';
import NotFound from './views/NotFound.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/about',
      name: 'About',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '/thread/create/:forumId',
      name: 'ThreadCreate',
      component: ThreadCreate,
      props: true,
    },
    {
      path: '/thread/:id',
      name: 'ThreadShow',
      component: ThreadShow,
      props: true,
    },
    {
      path: '/thread/:id/edit',
      name: 'ThreadEdit',
      component: ThreadEdit,
      props: true,
    },
    {
      path: '/category/:id',
      name: 'Category',
      component: Category,
      props: true,
    },
    {
      path: '/forum/:id',
      name: 'Forum',
      component: Forum,
      props: true,
    },
    {
      path: '/me',
      name: 'Profile',
      component: Profile,
      props: true,
    },
    {
      path: '/me/edit',
      name: 'ProfileEdit',
      component: Profile,
      props: { edit: true },
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound,
      // redirect: { name: 'home' },
    },
  ],
});
