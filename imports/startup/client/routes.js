import Vue from 'vue';
import VueRouter from 'vue-router';
import VueMeteorTracker from 'vue-meteor-tracker';

import Layout from '../../ui/layouts/main';
import { 
  Constraints,
  is_valid_constraint,
  add_rel,
  add_script,
} from '../../ui/layouts/main/lib';

import '../../ui/components/welcome';
import '../../ui/components/new_harbormaster';
import RootPage from '../../ui/pages/root';
import LanesPage from '../../ui/pages/lanes';
import UsersPage from '../../ui/pages/users';
import AddUserPage from '../../ui/pages/users/add_user';
import ProfilePage from '../../ui/pages/profile';
import EditLanePage from '../../ui/pages/lanes/edit_lane';
import ShipLanePage from '../../ui/pages/lanes/ship_lane';
import CharterPage from '../../ui/pages/lanes/charter';

const routes = [
  {
    path: "/",
    name: "root",
    component: RootPage,
  },
  {
    path: "/lanes",
    name: "lanes",
    component: LanesPage,
  },
  {
    path: "/lanes/:slug/edit",
    name: "edit_lane",
    component: EditLanePage,
  },
  {
    path: '/lanes//ship',
    redirect: '/lanes',
  },
  {
    path: "/lanes/:slug/ship/:date?",
    name: "ship_lane",
    component: ShipLanePage,
  },
  {
    path: "/lanes/:slug/charter",
    name: "charter",
    component: CharterPage,
  },
  {
    path: "/users",
    name: "users",
    component: UsersPage,
  },
  {
    path: "/users/add-user",
    name: "add_user",
    component: AddUserPage,
  },
  {
    path: "/profile/:user_id?",
    name: "profile",
    component: ProfilePage,
  },
  {
    path: '/#/reset-password/:token',
    name: 'reset_password',
    component: RootPage,
  },
];

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes,
});

Meteor.startup(() => {
  Vue.use(VueMeteorTracker);
  new Vue({ router, render: (h) => h(Layout) }).$mount('#app');
});

export default router;