import Vue from "vue";
import VueRouter from "vue-router";

const LoginView = () =>
  import(/* webpackChunkName:'login'*/ "../views/LoginView.vue");
const ResetView = () =>
  import(/* webpackChunkName:'reset'*/ "../views/ResetView.vue");
const NotFoundView = () =>
  import(/* webpackChunkName:'not-found'*/ "../views/NotFoundView.vue");
const ProfileView = () =>
  import(/* webpackChunkName:'profile'*/ "../views/ProfileView.vue");
const UsersView = () =>
  import(/* webpackChunkName:'users'*/ "../views/UsersView.vue");
const ManagersView = () =>
  import(/* webpackChunkName:'managers*/ "../views/ManagersView.vue");
const CoursesView = () =>
  import(/* webpackChunkName:'courses'*/ "../views/CoursesView.vue");
const CourseDetailsView = () =>
  import(
    /* webpackChunkName:'course-details'*/ "../views/CourseDetailsView.vue"
  );
const CoursesDashboardView = () =>
  import(/* webpackChunkName:'courses'*/ "../views/CoursesDashboardView.vue");

import { ADMIN_ROLE } from "@/constants/roles.constant";
import {
  LOGIN,
  RESET,
  PROFILE,
  MANAGERS,
  USERS,
  COURSE_DASHBOARD,
  COURSE_DETAILS,
} from "@/constants/routes.constant";
import { authGuard, roleGuard } from "./utils";

Vue.use(VueRouter);

// FAKE USER
const fakeUser = {
  email: "webportaladmin@inventorsoft.co",
  fullName: "InventorSoft Admin",
  role: "admin",
  id: "e5616235-be1c-4003-b5fe-33fa96195f72",
  isAuth: true,
};
localStorage.setItem("user", JSON.stringify(fakeUser));

const routes = [
  {
    path: "/",
    meta: { requiresAuth: true },
    redirect: { name: COURSE_DASHBOARD }, // DEFAULT PAGE
  },
  {
    path: "/login",
    name: LOGIN,
    component: LoginView,
    meta: { requiresAuth: false },
  },
  {
    path: "/reset",
    name: RESET,
    component: ResetView,
    meta: { requiresAuth: false },
  },

  {
    path: "/profile",
    name: PROFILE,
    component: ProfileView,
    meta: { requiresAuth: true },
  },

  {
    path: "/users",
    name: USERS,
    component: UsersView,
    meta: { requiresAuth: true },
  },

  {
    path: "/managers",
    name: MANAGERS,
    component: ManagersView,
    meta: { requiresAuth: true, requiredRoles: [ADMIN_ROLE] },
    beforeEnter: roleGuard,
  },

  {
    path: "/courses",
    component: CoursesView,
    meta: { requiresAuth: true },
    children: [
      {
        path: "",
        name: COURSE_DASHBOARD,
        component: CoursesDashboardView,
      },
      {
        path: ":id",
        name: COURSE_DETAILS,
        component: CourseDetailsView,
        props: true,
      },
    ],
  },

  {
    path: "*",
    component: NotFoundView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(authGuard);

export default router;
