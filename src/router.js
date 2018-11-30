import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';
import Home from './views/Home.vue';
import ThreadShow from './views/ThreadShow.vue';
import ThreadEdit from './views/ThreadEdit.vue';
import ThreadCreate from './views/ThreadCreate.vue';
import Category from './views/Category.vue';
import Forum from './views/Forum.vue';
import Profile from './views/Profile.vue';
import Register from './views/Register.vue';
import SignIn from './views/SignIn.vue';
import NotFound from './views/NotFound.vue';

Vue.use(Router);

const router = new Router({
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
      meta: {
        requiresAuth: true,
      },
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
      meta: {
        requiresAuth: true,
      },
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
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/me/edit',
      name: 'ProfileEdit',
      component: Profile,
      props: { edit: true },
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {
        requiresGuest: true,
      },
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: SignIn,
      meta: {
        requiresGuest: true,
      },
    },
    {
      path: '/logout',
      name: 'SignOut',
      meta: {
        requiresAuth: true,
      },
      beforeEnter(to, from, next) {
        store.dispatch('signOut')
          .then(() => next({ name: 'Home' }));
      },
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound,
      // redirect: { name: 'home' },
    },
  ],
});

router.beforeEach((to, from, next) => {
  store.dispatch('initAuthentication')
    .then((user) => {
      //  to.matched.some checkes also nested routes if any of them has requiresAuth property
      if (to.matched.some(route => route.meta.requiresAuth)) {
        //  protect route
        if (user) {
          next();
        } else {
          next({ name: 'SignIn', query: { redirectTo: to.path } });
        }
      } else if (to.matched.some(route => route.meta.requiresGuest)) {
        //  protect route
        if (!user) {
          next();
        } else {
          next({ name: 'Home' });
        }
      } else {
        next();
      }
    });
});

export default router;
